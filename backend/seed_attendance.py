from datetime import date, timedelta, time
from random import choice, randint

from app.core.database import engine, SessionLocal, Base
from app.models.user import User
from app.models.attendance import Attendance, AttendanceStatus

# --------------------------------------------------
# CREATE TABLES
# --------------------------------------------------
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# --------------------------------------------------
# SEED ATTENDANCE
# --------------------------------------------------
today = date.today()
DAYS_TO_SEED = 30

users = db.query(User).all()

if not users:
    print("❌ No users found. Seed users first.")
    exit()

for user in users:
    for i in range(DAYS_TO_SEED):
        att_date = today - timedelta(days=i)

        # Skip if already exists
        if db.query(Attendance).filter(
            Attendance.user_id == user.id,
            Attendance.date == att_date
        ).first():
            continue

        # WEEKENDS → HOLIDAY
        if att_date.weekday() >= 5:
            attendance = Attendance(
                user_id=user.id,
                date=att_date,
                status=AttendanceStatus.HOLIDAY
            )

        else:
            status = choice([
                AttendanceStatus.PRESENT,
                AttendanceStatus.PRESENT,
                AttendanceStatus.PRESENT,  # bias toward present
                AttendanceStatus.LATE,
                AttendanceStatus.ABSENT,
            ])

            if status == AttendanceStatus.ABSENT:
                attendance = Attendance(
                    user_id=user.id,
                    date=att_date,
                    status=status
                )

            elif status == AttendanceStatus.LATE:
                late_minutes = randint(10, 60)
                attendance = Attendance(
                    user_id=user.id,
                    date=att_date,
                    punch_in=time(9, late_minutes),
                    punch_out=time(18, 30),
                    working_minutes=540,
                    late_minutes=late_minutes,
                    overtime_minutes=randint(0, 30),
                    status=status
                )

            else:  # PRESENT
                attendance = Attendance(
                    user_id=user.id,
                    date=att_date,
                    punch_in=time(9, 0),
                    punch_out=time(18, 0),
                    working_minutes=540,
                    late_minutes=0,
                    overtime_minutes=randint(0, 60),
                    status=status
                )

        db.add(attendance)

db.commit()
db.close()

print("✅ Attendance seeded for last 30 days")
