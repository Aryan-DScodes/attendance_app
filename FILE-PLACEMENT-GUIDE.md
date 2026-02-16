# 📁 FILE PLACEMENT GUIDE

After downloading all files, create this exact folder structure:

```
attendance-app/
│
├── 📄 README.md                           ← Setup instructions
├── 📄 QUICK-START.md                      ← Quick commands
│
├── 📂 backend/                            ← Python FastAPI Backend
│   ├── main.py                           ← Main API application
│   ├── database.py                       ← Database configuration
│   ├── models.py                         ← SQLAlchemy models
│   └── requirements.txt                  ← Python dependencies
│
└── 📂 frontend/                           ← React Frontend
    │
    ├── package.json                      ← Node.js dependencies
    ├── vite.config.js                    ← Vite configuration
    ├── tailwind.config.js                ← Tailwind CSS config
    ├── postcss.config.js                 ← PostCSS config
    ├── index.html                        ← HTML entry point
    │
    └── 📂 src/
        ├── index.css                     ← Global styles
        ├── main.jsx                      ← React entry point
        ├── App.jsx                       ← Main app component
        │
        ├── 📂 components/
        │   ├── SubjectCard.jsx
        │   ├── AttendanceForm.jsx
        │   └── StatsCard.jsx
        │
        └── 📂 pages/
            ├── Subjects.jsx
            ├── DailyAttendance.jsx
            └── Analytics.jsx
```

## 📥 How to Organize Downloaded Files

1. **Create main folder**: `attendance-app`

2. **Create subfolders**:
   - `attendance-app/backend`
   - `attendance-app/frontend`
   - `attendance-app/frontend/src`
   - `attendance-app/frontend/src/components`
   - `attendance-app/frontend/src/pages`

3. **Place files** according to the structure above

## ✅ File Count Check

You should have downloaded **20 files total**:
- ✅ 2 documentation files (README.md, QUICK-START.md)
- ✅ 4 backend files (main.py, database.py, models.py, requirements.txt)
- ✅ 5 frontend config files (package.json, vite.config.js, tailwind.config.js, postcss.config.js, index.html)
- ✅ 3 src files (index.css, main.jsx, App.jsx)
- ✅ 3 component files (SubjectCard.jsx, AttendanceForm.jsx, StatsCard.jsx)
- ✅ 3 page files (Subjects.jsx, DailyAttendance.jsx, Analytics.jsx)

## 🚀 After Organizing Files

1. Open terminal in `attendance-app/backend`
2. Run: `pip install -r requirements.txt`
3. Run: `python main.py`

4. Open NEW terminal in `attendance-app/frontend`
5. Run: `npm install`
6. Run: `npm run dev`

7. Open browser: `http://localhost:5173`

## 💡 Quick Tip

If you're on Windows and using File Explorer:
- Right-click in folder → "Open in Terminal"
- OR hold Shift + Right-click → "Open PowerShell window here"

That's it! 🎉
