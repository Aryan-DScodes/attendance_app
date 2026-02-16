from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import date, datetime
from pydantic import BaseModel
import models
from database import engine, get_db

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Attendance Tracker API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request/response
class SubjectCreate(BaseModel):
    name: str

class SubjectResponse(BaseModel):
    id: int
    name: str
    created_at: datetime

    class Config:
        from_attributes = True

class AttendanceCreate(BaseModel):
    subject_id: int
    date: date
    total_lectures: int
    attended_lectures: int

class AttendanceResponse(BaseModel):
    id: int
    subject_id: int
    date: date
    total_lectures: int
    attended_lectures: int
    absent_lectures: int
    subject_name: Optional[str] = None

    class Config:
        from_attributes = True

class SubjectStats(BaseModel):
    subject_id: int
    subject_name: str
    total_conducted: int
    total_attended: int
    total_absent: int
    attendance_percentage: float

class OverallStats(BaseModel):
    total_subjects: int
    total_conducted: int
    total_attended: int
    total_absent: int
    overall_percentage: float
    subject_stats: List[SubjectStats]

# Routes
@app.get("/")
def root():
    return {"message": "Attendance Tracker API", "status": "running"}

# Subject routes
@app.post("/subjects", response_model=SubjectResponse)
def create_subject(subject: SubjectCreate, db: Session = Depends(get_db)):
    db_subject = models.Subject(name=subject.name)
    db.add(db_subject)
    db.commit()
    db.refresh(db_subject)
    return db_subject

@app.get("/subjects", response_model=List[SubjectResponse])
def get_subjects(db: Session = Depends(get_db)):
    return db.query(models.Subject).all()

@app.get("/subjects/{subject_id}", response_model=SubjectResponse)
def get_subject(subject_id: int, db: Session = Depends(get_db)):
    subject = db.query(models.Subject).filter(models.Subject.id == subject_id).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    return subject

@app.delete("/subjects/{subject_id}")
def delete_subject(subject_id: int, db: Session = Depends(get_db)):
    subject = db.query(models.Subject).filter(models.Subject.id == subject_id).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    
    # Delete all attendance records for this subject
    db.query(models.AttendanceRecord).filter(models.AttendanceRecord.subject_id == subject_id).delete()
    db.delete(subject)
    db.commit()
    return {"message": "Subject deleted successfully"}

# Attendance routes
@app.post("/attendance", response_model=AttendanceResponse)
def create_attendance(attendance: AttendanceCreate, db: Session = Depends(get_db)):
    # Validate subject exists
    subject = db.query(models.Subject).filter(models.Subject.id == attendance.subject_id).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    
    # Validate lectures
    if attendance.attended_lectures > attendance.total_lectures:
        raise HTTPException(status_code=400, detail="Attended lectures cannot exceed total lectures")
    
    if attendance.total_lectures < 0 or attendance.attended_lectures < 0:
        raise HTTPException(status_code=400, detail="Lecture counts cannot be negative")
    
    # Check if attendance already exists for this subject and date
    existing = db.query(models.AttendanceRecord).filter(
        models.AttendanceRecord.subject_id == attendance.subject_id,
        models.AttendanceRecord.date == attendance.date
    ).first()
    
    if existing:
        # Update existing record
        existing.total_lectures = attendance.total_lectures
        existing.attended_lectures = attendance.attended_lectures
        existing.absent_lectures = attendance.total_lectures - attendance.attended_lectures
        db.commit()
        db.refresh(existing)
        response = AttendanceResponse(
            id=existing.id,
            subject_id=existing.subject_id,
            date=existing.date,
            total_lectures=existing.total_lectures,
            attended_lectures=existing.attended_lectures,
            absent_lectures=existing.absent_lectures,
            subject_name=subject.name
        )
        return response
    
    # Create new record
    absent = attendance.total_lectures - attendance.attended_lectures
    db_attendance = models.AttendanceRecord(
        subject_id=attendance.subject_id,
        date=attendance.date,
        total_lectures=attendance.total_lectures,
        attended_lectures=attendance.attended_lectures,
        absent_lectures=absent
    )
    db.add(db_attendance)
    db.commit()
    db.refresh(db_attendance)
    
    response = AttendanceResponse(
        id=db_attendance.id,
        subject_id=db_attendance.subject_id,
        date=db_attendance.date,
        total_lectures=db_attendance.total_lectures,
        attended_lectures=db_attendance.attended_lectures,
        absent_lectures=db_attendance.absent_lectures,
        subject_name=subject.name
    )
    return response

@app.get("/attendance", response_model=List[AttendanceResponse])
def get_attendance(
    subject_id: Optional[int] = None,
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.AttendanceRecord, models.Subject).join(
        models.Subject, models.AttendanceRecord.subject_id == models.Subject.id
    )
    
    if subject_id:
        query = query.filter(models.AttendanceRecord.subject_id == subject_id)
    if start_date:
        query = query.filter(models.AttendanceRecord.date >= start_date)
    if end_date:
        query = query.filter(models.AttendanceRecord.date <= end_date)
    
    results = query.all()
    
    return [
        AttendanceResponse(
            id=record.id,
            subject_id=record.subject_id,
            date=record.date,
            total_lectures=record.total_lectures,
            attended_lectures=record.attended_lectures,
            absent_lectures=record.absent_lectures,
            subject_name=subject.name
        )
        for record, subject in results
    ]

@app.get("/analytics", response_model=OverallStats)
def get_analytics(db: Session = Depends(get_db)):
    subjects = db.query(models.Subject).all()
    subject_stats = []
    
    total_conducted_all = 0
    total_attended_all = 0
    total_absent_all = 0
    
    for subject in subjects:
        records = db.query(models.AttendanceRecord).filter(
            models.AttendanceRecord.subject_id == subject.id
        ).all()
        
        total_conducted = sum(r.total_lectures for r in records)
        total_attended = sum(r.attended_lectures for r in records)
        total_absent = sum(r.absent_lectures for r in records)
        
        attendance_percentage = (total_attended / total_conducted * 100) if total_conducted > 0 else 0
        
        subject_stats.append(SubjectStats(
            subject_id=subject.id,
            subject_name=subject.name,
            total_conducted=total_conducted,
            total_attended=total_attended,
            total_absent=total_absent,
            attendance_percentage=round(attendance_percentage, 2)
        ))
        
        total_conducted_all += total_conducted
        total_attended_all += total_attended
        total_absent_all += total_absent
    
    overall_percentage = (total_attended_all / total_conducted_all * 100) if total_conducted_all > 0 else 0
    
    return OverallStats(
        total_subjects=len(subjects),
        total_conducted=total_conducted_all,
        total_attended=total_attended_all,
        total_absent=total_absent_all,
        overall_percentage=round(overall_percentage, 2),
        subject_stats=subject_stats
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
