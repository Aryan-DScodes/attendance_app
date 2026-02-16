# 📚 Attendance Tracker - Complete Setup Guide

A beautiful, full-stack attendance tracking application built with **FastAPI** + **React** + **Tailwind CSS**.

## 🎯 Features

- ✅ Add unlimited subjects (lectures + labs)
- ✅ Track attendance lecture-wise (not day-wise)
- ✅ Variable lectures per day (0, 1, 2, 3+ lectures)
- ✅ Real-time attendance percentage calculation
- ✅ Beautiful, modern UI with smooth animations
- ✅ Mobile-first responsive design
- ✅ Subject-wise and overall analytics

---

## 🚀 Quick Start (5 Minutes)

### Prerequisites

Make sure you have installed:
- **Python 3.8+** → [Download Python](https://www.python.org/downloads/)
- **Node.js 18+** → [Download Node.js](https://nodejs.org/)

### Step 1: Download the Project

Extract the `attendance-app` folder to your desired location (e.g., `C:\Projects\attendance-app`).

### Step 2: Setup Backend

Open **Command Prompt** or **PowerShell** and navigate to the backend folder:

```bash
cd C:\path\to\attendance-app\backend
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

Start the backend server:

```bash
python main.py
```

✅ You should see: `Uvicorn running on http://0.0.0.0:8000`

**Keep this terminal window open!**

---

### Step 3: Setup Frontend

Open a **NEW terminal window** and navigate to the frontend folder:

```bash
cd C:\path\to\attendance-app\frontend
```

Install Node.js dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

✅ You should see: `Local: http://localhost:5173/`

**Keep this terminal window open too!**

---

### Step 4: Open the App

Open your browser and go to:

```
http://localhost:5173
```

🎉 **You're done!** The app should now be running.

---

## 📱 How to Use

### 1. Add Subjects
- Click **"+ Add Subject"** button
- Enter subject name (e.g., "Data Structures", "Physics Lab")
- Click **"Add"**

### 2. Mark Daily Attendance
- Go to **"Mark Today"** tab
- Select the date
- For each subject:
  - Enter **total lectures today** (e.g., 2)
  - Enter **lectures attended** (e.g., 1)
  - Click **"Save Attendance"**

💡 **Important:** If no lectures were held for a subject, enter `0` for both fields.

### 3. View Analytics
- Go to **"Analytics"** tab
- See your overall attendance percentage
- View subject-wise breakdown
- Track total attended/missed lectures

---

## 🎨 Features Explained

### Lecture-wise Tracking
- Some days might have 0 lectures → Enter 0 for total and attended
- Some days might have 3 lectures → Enter 3 for total, and how many you attended
- Attendance % = (Total Attended Lectures / Total Conducted Lectures) × 100

### Color Coding
- 🟢 **Green** (75%+) → Good attendance
- 🟡 **Yellow** (60-74%) → Warning zone
- 🔴 **Red** (<60%) → Need improvement

---

## 📂 Project Structure

```
attendance-app/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── database.py          # SQLite database config
│   ├── models.py            # Database models
│   ├── requirements.txt     # Python dependencies
│   └── attendance.db        # SQLite database (auto-created)
│
└── frontend/
    ├── src/
    │   ├── components/      # Reusable components
    │   ├── pages/           # Main pages
    │   ├── App.jsx          # Main app with routing
    │   ├── main.jsx         # Entry point
    │   └── index.css        # Global styles
    ├── package.json         # Node dependencies
    ├── vite.config.js       # Vite configuration
    └── tailwind.config.js   # Tailwind configuration
```

---

## 🛠️ Troubleshooting

### Backend won't start?
- Make sure Python 3.8+ is installed: `python --version`
- Try: `pip install --upgrade pip`
- Then reinstall: `pip install -r requirements.txt`

### Frontend won't start?
- Make sure Node.js is installed: `node --version`
- Delete `node_modules` folder and try again:
  ```bash
  rm -rf node_modules
  npm install
  ```

### Port already in use?
**Backend (8000):**
Edit `backend/main.py`, change the last line:
```python
uvicorn.run(app, host="0.0.0.0", port=8001)  # Changed to 8001
```

**Frontend (5173):**
Edit `frontend/vite.config.js`:
```javascript
server: {
  port: 5174,  // Changed to 5174
}
```

### Can't connect to backend?
- Make sure both backend and frontend are running
- Check CORS settings in `backend/main.py`
- Verify the API URL in frontend is correct: `http://localhost:8000`

---

## 🎯 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/subjects` | Get all subjects |
| POST | `/subjects` | Create new subject |
| DELETE | `/subjects/{id}` | Delete subject |
| POST | `/attendance` | Record attendance |
| GET | `/attendance` | Get attendance records |
| GET | `/analytics` | Get statistics |

---

## 💡 Tips

1. **Daily routine:** 
   - Open the app
   - Go to "Mark Today"
   - Fill in attendance for all subjects
   - Takes less than 2 minutes!

2. **Track multiple semesters:**
   - Delete old subjects when semester ends
   - Add new subjects for new semester

3. **Mobile use:**
   - App is fully responsive
   - Works great on phones and tablets

---

## 🔒 Data Storage

- All data is stored locally in `backend/attendance.db` (SQLite database)
- No cloud, no login required
- Your data stays on your computer
- To backup: Just copy the `attendance.db` file

---

## 🎨 Customization

### Change Colors
Edit `frontend/tailwind.config.js` to customize the color scheme.

### Change Port
- Backend: Edit `backend/main.py` (last line)
- Frontend: Edit `frontend/vite.config.js`

---

## 📝 Example Workflow

**Monday Morning:**
1. Had Data Structures class → 2 lectures, attended both
   - Total: 2, Attended: 2
2. Had Physics Lab → 1 lecture, attended it
   - Total: 1, Attended: 1
3. No other classes today
   - Don't need to enter anything for other subjects!

**Result:** Your attendance is automatically calculated and updated! 🎉

---

## 🆘 Need Help?

If something isn't working:
1. Check both terminals are running (backend + frontend)
2. Check the browser console for errors (F12)
3. Make sure you're using `http://localhost:5173` (not https)

---

## 🎉 You're All Set!

Enjoy tracking your attendance with style! 📚✨

---

**Built with ❤️ using FastAPI, React, Vite, and Tailwind CSS**
