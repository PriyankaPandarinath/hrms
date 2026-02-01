from app.core.database import engine, SessionLocal, Base
from app.models.user import User
from app.core.security import hash_password


# --------------------------------------------------
# CREATE TABLES
# --------------------------------------------------
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# --------------------------------------------------
# USERS DATA
# --------------------------------------------------
users_data = [
    # Admin / HR / Manager
    ("admin@ssspl.com", "admin123", "ADMIN"),
    ("hr@ssspl.com", "hr123", "HR"),
    ("manager@ssspl.com", "manager123", "MANAGER"),

    # Employees (Indian names)
    ("rajesh.kumar@ssspl.com", "employee123", "EMPLOYEE"),
    ("priya.sharma@ssspl.com", "employee123", "EMPLOYEE"),
    ("amit.verma@ssspl.com", "employee123", "EMPLOYEE"),
    ("sunita.reddy@ssspl.com", "employee123", "EMPLOYEE"),
    ("vikram.singh@ssspl.com", "employee123", "EMPLOYEE"),
    ("ananya.iyer@ssspl.com", "employee123", "EMPLOYEE"),
    ("rohit.patel@ssspl.com", "employee123", "EMPLOYEE"),
    ("neha.jain@ssspl.com", "employee123", "EMPLOYEE"),
    ("suresh.nair@ssspl.com", "employee123", "EMPLOYEE"),
    ("pooja.mehta@ssspl.com", "employee123", "EMPLOYEE"),
    ("arjun.malhotra@ssspl.com", "employee123", "EMPLOYEE"),
    ("kavita.desai@ssspl.com", "employee123", "EMPLOYEE"),
    ("manoj.yadav@ssspl.com", "employee123", "EMPLOYEE"),
    ("deepak.chopra@ssspl.com", "employee123", "EMPLOYEE"),
    ("swati.kulkarni@ssspl.com", "employee123", "EMPLOYEE"),
    ("ravi.teja@ssspl.com", "employee123", "EMPLOYEE"),
    ("meenakshi.gupta@ssspl.com", "employee123", "EMPLOYEE"),
]

# --------------------------------------------------
# SEED USERS
# --------------------------------------------------
for email, pwd, role in users_data:
    exists = db.query(User).filter(User.email == email).first()
    if not exists:
        db.add(
            User(
                email=email,
                hashed_password=hash_password(pwd),
                role=role
            )
        )

db.commit()
db.close()

print("✅ Users seeded successfully")
