# 🧠 Smart Quiz System

## Project Description
Smart Quiz System is a fully responsive, interactive front-end web application built using **HTML, CSS, and vanilla JavaScript**.  
It allows users to create custom quizzes, attempt quizzes with a timer, view results, and track performance history using browser localStorage.

The project focuses on **DOM manipulation, client-side validation, and dynamic UI updates** without using any backend or external frameworks.

---

## Problem Statement
Students require a simple, offline-friendly quiz system for practice and self-assessment.  
The aim of this project is to design a lightweight quiz platform that works entirely in the browser, enabling quiz creation, participation, and performance tracking in a structured and user-friendly manner.

---

## Features Implemented

### Dashboard
- Central navigation to all sections
- Clean and responsive layout

### Create Quiz
- Create quizzes with title and duration
- Add multiple questions dynamically
- Each question supports four options (A–D)
- Correct answer selection
- Validation for empty fields and invalid duration
- Duplicate quiz title prevention
- Draft questions saved using localStorage
- Custom popup messages instead of browser alerts

### My Quizzes
- View all created quizzes
- Start quiz functionality
- Delete quizzes with confirmation popup

### Take Quiz
- Dynamically loads selected quiz
- Timer-based quiz attempt
- Automatic submission on timer expiration with confirmation

### Result & History
- Result page displaying score and performance
- Performance history stored in localStorage
- Clear history option with confirmation popup
- Responsive UI using media queries

---

## DOM Concepts Used
- DOM selection using `querySelector()` and `querySelectorAll()`
- Event handling with `addEventListener()`
- Dynamic element creation and removal using `createElement()`
- Updating content using `innerHTML`
- Conditional rendering based on application state
- Form handling using `preventDefault()`
- Real-time UI updates using JavaScript

---

## Steps to Run the Project
1. Download or clone the repository
2. Open the project folder
3. Start by opening `index.html`
4. Navigate through the application using the navbar
5. No server or backend setup is required

---

## Known Limitations
- Data is stored using browser localStorage only
- Saved data is browser-specific
- Clearing browser data will remove quizzes and performance history
- No multi-user or authentication support

---

## Technologies Used
- HTML5
- CSS3
- JavaScript (Vanilla)
- Browser localStorage
