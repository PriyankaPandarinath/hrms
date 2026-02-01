from sqlalchemy import (
    Column,
    Integer,
    Date,
    Time,
    Enum,
    ForeignKey,
    UniqueConstraint
)
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum
from datetime import datetime


class AttendanceStatus(str, enum.Enum):
    PRESENT = "PRESENT"
    ABSENT = "ABSENT"
    LATE = "LATE"
    ON_LEAVE = "ON_LEAVE"
    HALF_DAY = "HALF_DAY"
    HOLIDAY = "HOLIDAY"


class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    date = Column(Date, nullable=False, index=True)

    punch_in = Column(Time, nullable=True)
    punch_out = Column(Time, nullable=True)

    working_minutes = Column(Integer, default=0)
    late_minutes = Column(Integer, default=0)
    overtime_minutes = Column(Integer, default=0)

    status = Column(
        Enum(AttendanceStatus, name="attendance_status"),
        nullable=False
    )

    created_at = Column(Date, default=datetime.utcnow)
    updated_at = Column(Date, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", backref="attendance_records")

    __table_args__ = (
        UniqueConstraint("user_id", "date", name="uq_user_date_attendance"),
    )
