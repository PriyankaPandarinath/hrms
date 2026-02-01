from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.schemas.attendance import (
    AttendanceResponse,
    AttendanceStats,
)
from app.services.attendance_service import (
    punch_in,
    punch_out,
    get_my_attendance,
    get_attendance_stats,
)

router = APIRouter(tags=["Attendance"])


from app.schemas.attendance import PaginatedAttendanceResponse

@router.get(
    "/attendance/me",
    response_model=PaginatedAttendanceResponse
)
def my_attendance(
    page: int = 1,
    limit: int = 10,
    status: str | None = None,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    return get_my_attendance(db, user, page, limit, status)



@router.post("/attendance/punch-in", response_model=AttendanceResponse)
def punch_in_attendance(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return punch_in(db, current_user)


@router.post("/attendance/punch-out", response_model=AttendanceResponse)
def punch_out_attendance(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return punch_out(db, current_user)


@router.get("/attendance/stats", response_model=AttendanceStats)
def attendance_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    stats = get_attendance_stats(db, current_user)
    return stats

