# 🚀 QUICK START - Copy & Paste Commands

## ⚡ For Windows Users

### Terminal 1 - Backend
```bash
# Navigate to backend
cd attendance-app\backend

# Install dependencies
pip install -r requirements.txt

# Start server
python main.py
```

✅ Backend will run on `http://localhost:8000`  
⚠️ **Keep this terminal open!**

---

### Terminal 2 - Frontend (Open NEW terminal window)
```bash
# Navigate to frontend
cd attendance-app\frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

✅ Frontend will run on `http://localhost:5173`  
⚠️ **Keep this terminal open too!**

---

### Open Browser
```
http://localhost:5173
```

---

## 🍎 For Mac/Linux Users

### Terminal 1 - Backend
```bash
cd attendance-app/backend
pip install -r requirements.txt
python main.py
```

### Terminal 2 - Frontend
```bash
cd attendance-app/frontend
npm install
npm run dev
```

### Browser
```
http://localhost:5173
```

---

## ✅ Success Checklist

You should have:
- ✅ Backend running (Terminal 1 shows Uvicorn running)
- ✅ Frontend running (Terminal 2 shows Vite dev server)
- ✅ Browser open at localhost:5173
- ✅ Beautiful UI loaded with navigation bar

---

## 🎯 First Steps in the App

1. **Add a subject** → Click "+ Add Subject" button
2. **Go to "Mark Today"** tab → Mark attendance for today
3. **View "Analytics"** tab → See your stats

---

## ⚠️ Common Issues

**"pip not found"**
- Install Python from python.org
- During installation, check "Add Python to PATH"

**"npm not found"**
- Install Node.js from nodejs.org
- Restart your terminal after installation

**"Port 8000 already in use"**
- Another app is using port 8000
- Change port in `backend/main.py` (last line) to 8001

**"Port 5173 already in use"**
- Change port in `frontend/vite.config.js` to 5174

---

## 🎉 That's It!

Start tracking your attendance! 📚
