from pydantic import BaseModel
from datetime import date, time
from typing import Optional, List
from enum import Enum


class AttendanceOut(BaseModel):
    id: int
    date: date
    punch_in: Optional[time]
    punch_out: Optional[time]
    working_minutes: int
    late_minutes: int
    overtime_minutes: int
    status: str

    class Config:
        from_attributes = True


class PaginatedAttendanceResponse(BaseModel):
    items: List[AttendanceOut]
    total: int
    page: int
    limit: int
    total_pages: int



class AttendanceStatus(str, Enum):
    PRESENT = "PRESENT"
    ABSENT = "ABSENT"
    LATE = "LATE"
    ON_LEAVE = "ON_LEAVE"
    HALF_DAY = "HALF_DAY"
    HOLIDAY = "HOLIDAY"


class AttendanceResponse(BaseModel):
    id: int
    date: date

    punch_in: Optional[time]
    punch_out: Optional[time]

    working_minutes: int
    late_minutes: int
    overtime_minutes: int

    status: AttendanceStatus

    class Config:
        from_attributes = True


class AttendanceStats(BaseModel):
    present: int
    absent: int
    late: int
    on_leave: int
    half_day: int
    holiday: int


class PunchInRequest(BaseModel):
    pass


class PunchOutRequest(BaseModel):
    pass


class AttendanceStats(BaseModel):
    PRESENT: int
    ABSENT: int
    LATE: int
    ON_LEAVE: int
    HALF_DAY: int
    HOLIDAY: int
