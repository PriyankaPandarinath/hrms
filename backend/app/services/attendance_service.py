from sqlalchemy.orm import Session
from datetime import datetime, date, time
from typing import List

from app.models.attendance import Attendance, AttendanceStatus
from app.models.user import User

OFFICE_START_TIME = time(9, 0)


def is_weekend(check_date: date) -> bool:
    return check_date.weekday() >= 5  # 5 = Saturday, 6 = Sunday


def get_today_attendance(db: Session, user: User) -> Attendance:
    today = date.today()

    attendance = (
        db.query(Attendance)
        .filter(Attendance.user_id == user.id, Attendance.date == today)
        .first()
    )

    if attendance:
        return attendance

    # Auto-create record
    if is_weekend(today):
        status = AttendanceStatus.HOLIDAY
    else:
        status = AttendanceStatus.ABSENT

    attendance = Attendance(
        user_id=user.id,
        date=today,
        status=status,
        working_minutes=0,
        late_minutes=0,
        overtime_minutes=0,
    )

    db.add(attendance)
    db.commit()
    db.refresh(attendance)

    return attendance


def punch_in(db: Session, user: User) -> Attendance:
    attendance = get_today_attendance(db, user)

# 🚫 BLOCK WEEKEND PUNCH-IN
    if is_weekend(attendance.date):
        return attendance  # Keep HOLIDAY, no punch allowed

    if attendance.punch_in:
        return attendance


    now = datetime.now().time()
    attendance.punch_in = now

    WORKING_DAY_END = time(18, 0)  # 6 PM

    if attendance.status != AttendanceStatus.HOLIDAY:
        if OFFICE_START_TIME < now <= time(12, 0):
            attendance.late_minutes = (
                (datetime.combine(date.today(), now) -
                datetime.combine(date.today(), OFFICE_START_TIME))
                .seconds // 60
            )
            attendance.status = AttendanceStatus.LATE
        else:
            attendance.late_minutes = 0
            attendance.status = AttendanceStatus.PRESENT



    db.commit()
    db.refresh(attendance)
    return attendance


def punch_out(db: Session, user: User) -> Attendance:
    attendance = get_today_attendance(db, user)

# 🚫 NO PUNCH-OUT ON HOLIDAY
    if attendance.status == AttendanceStatus.HOLIDAY:
        return attendance


    now = datetime.now().time()
    attendance.punch_out = now

    worked_minutes = (
        datetime.combine(date.today(), now) -
        datetime.combine(date.today(), attendance.punch_in)
    ).seconds // 60

    attendance.working_minutes = worked_minutes

    if worked_minutes > 9 * 60:
        attendance.overtime_minutes = worked_minutes - (9 * 60)

    db.commit()
    db.refresh(attendance)
    return attendance


# def get_my_attendance(db: Session, user: User) -> List[Attendance]:
#     return (
#         db.query(Attendance)
#         .filter(Attendance.user_id == user.id)
#         .order_by(Attendance.date.desc())
#         .all()
#     )

def get_my_attendance(
    db: Session,
    user: User,
    page: int = 1,
    limit: int = 10,
    status: str | None = None,
):
    query = db.query(Attendance).filter(Attendance.user_id == user.id)

    if status:
        try:
            status_enum = AttendanceStatus[status]
            query = query.filter(Attendance.status == status_enum)
        except KeyError:
            pass  # invalid status → ignore filter


    total = query.count()

    records = (
        query
        .order_by(Attendance.date.desc())
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return {
        "items": records,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": (total + limit - 1) // limit
    }



def get_attendance_stats(db: Session, user: User):
    records = (
        db.query(Attendance)
        .filter(Attendance.user_id == user.id)
        .all()
    )

    stats = {
        "PRESENT": 0,
        "ABSENT": 0,
        "LATE": 0,
        "ON_LEAVE": 0,
        "HALF_DAY": 0,
        "HOLIDAY": 0,
    }

    for record in records:
        stats[record.status.name] += 1

    return stats

