# 🎓 Full Stack Web Applications

Two full-stack web applications built as part of a Windows Web Application assignment using ASP.NET Core Web API, SQL Server, and modern frontend frameworks.

---

## 📁 Projects Overview

| | Project 1 | Project 2 |
|--|-----------|-----------|
| **Name** | Student Assignment Portal | Online Quiz Management System |
| **Backend** | ASP.NET Core Web API + ADO.NET | ASP.NET Core Web API + Entity Framework Core |
| **Frontend** | AngularJS | React |
| **Database** | SQL Server (Manual SQL) | SQL Server (Code First Migrations) |
| **Auth** | JWT + Role-based | JWT + Role-based |
| **Backend Tests** | xUnit + Moq (12 tests) | xUnit + Moq (15 tests) |
| **Frontend Tests** | Jasmine + Karma (15 tests) | Jest (20 tests) |
| **E2E Tests** | None | Selenium (12 tests) |

---

## 👤 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Teacher | teacher@test.com | Test@123 |
| Student | student@test.com | Test@123 |

---

---



# 📘 Project 2 — Online Quiz Management System

## 🔧 Tech Stack
- **Backend:** ASP.NET Core Web API, Entity Framework Core (Code First)
- **Frontend:** React + Axios
- **Auth:** JWT Tokens + Role-based Authorization
- **Testing:** xUnit + Moq (Backend), Jest (Frontend), Selenium (E2E)

## 👥 Roles
| Role | Permissions |
|------|------------|
| Teacher | Create, Edit, Delete Quizzes + Add Questions + View Results |
| Student | View Quizzes + Attempt Quizzes + View Own Results |

## 🗄️ Database Tables
- **Users** — Stores Teachers and Students
- **Quizzes** — Created by Teachers
- **Questions** — Belong to a Quiz
- **Results** — Student quiz attempts and scores

## 🔗 API Endpoints
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET | /api/quiz | Both |
| POST | /api/quiz | Teacher only |
| PUT | /api/quiz/{id} | Teacher only |
| DELETE | /api/quiz/{id} | Teacher only |
| POST | /api/quiz/{id}/questions | Teacher only |
| POST | /api/quiz/attempt | Student only |
| GET | /api/quiz/results/my | Student only |
| GET | /api/quiz/{id}/results | Teacher only |

## ▶️ How to Run the App

### Step 1 — Start the Backend
1. Open **Visual Studio**
2. Open project → **File → Recent Projects → QuizPortal**
3. Press **F5**
4. Wait for the console to show:
```
Now listening on: http://localhost:5292
```

### Step 2 — Start the Frontend
1. Open **Command Prompt**
2. Navigate to the frontend folder:
```
cd OnlineQuizManagementSystem\frontend
```
3. Start React:
```
npm start
```
4. Browser will automatically open at:
```
http://localhost:3000
```

## 🧪 How to Run the Tests

### Backend Tests (xUnit + Moq)
> ⚠️ Backend does NOT need to be running

- Open **Visual Studio**
- Click **Test** menu → **Run All Tests**
- ✅ 15 tests should pass

### Frontend Tests (Jest)
> ⚠️ Backend does NOT need to be running

Open **Command Prompt** and run:
```
cd OnlineQuizManagementSystem\frontend
npm test -- --watchAll=false
```
- ✅ 20 tests should pass

### Selenium E2E Tests
> ✅ Backend AND Frontend MUST be running first!

1. Start backend → Press **F5** in Visual Studio
2. Start frontend → Run `npm start` in Command Prompt
3. Open **Visual Studio** → **Test** menu → **Run All Tests**
4. Chrome will automatically open and click through the app
- ✅ 12 tests should pass

## 🛑 How to Stop
| What | How to Stop |
|------|------------|
| Backend | Press **Shift+F5** in Visual Studio |
| Frontend | Go to Command Prompt → press **Ctrl+C** |

---

## ⚡ Quick Reference

| | Project 1 | Project 2 |
|--|-----------|-----------|
| Backend Port | 5235 | 5292 |
| Frontend Port | 8080 | 3000 |
| Backend Tests | 12 ✅ | 15 ✅ |
| Frontend Tests | 15 ✅ | 20 ✅ |
| E2E Tests | None | 12 ✅ |
| **Total Tests** | **27** | **47** |

---

## 🛠️ Tools & Technologies Used
- Microsoft Visual Studio Community Edition
- ASP.NET Core Web API (.NET 10)
- SQL Server + SSMS
- Entity Framework Core (Code First)
- ADO.NET (Raw SQL)
- AngularJS
- React
- JWT Authentication
- BCrypt Password Hashing
- xUnit + Moq
- Jasmine + Karma
- Jest + React Testing Library
- Selenium WebDriver
- Git + GitHub
- IIS Express
