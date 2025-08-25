# Examplify: A Modern Computer-Based Test (CBT) Platform

Examplify is a feature-rich, full-stack web application designed for creating, managing, and taking online exams. It provides a secure and intuitive environment for both administrators and candidates, built with a modern, robust technology stack.

This project was bootstrapped with [Firebase Studio](https://firebase.google.com/docs/studio).

## Table of Contents

- [Features](#features)
  - [Admin Features](#admin-features)
  - [Candidate Features](#candidate-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Firebase Setup](#firebase-setup)
  - [Installation & Running Locally](#installation--running-locally)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)

## Features

### Admin Features

- **Secure Authentication:** Admins have a separate, secure sign-up and login flow.
- **Dashboard:** An overview of key statistics, including the total number of tests, registered candidates, and recently completed test results.
- **Test Management:**
    - **Create & Edit Tests:** A powerful, user-friendly interface to build and modify tests. Admins can add multiple-choice questions, define options, mark the correct answer, and set a specific duration for the exam.
    - **View All Tests:** A comprehensive list of all created tests with details on the number of questions and duration.
    - **Delete Tests:** Ability to delete a test, which also cleans up all associated invitations and results to maintain data integrity.
- **Candidate Management:**
    - **Invite Candidates:** Admins can invite one or more candidates to a specific test by entering their email addresses.
    - **View Candidates:** A list of all registered candidates in the system.
- **Results Tracking:**
    - **View All Results:** A detailed table of all submitted test results, showing the candidate, test, score, and submission date.
    - **Filter & Export:** Functionality to filter results and export them for reporting.

### Candidate Features

- **Secure Authentication:** Candidates can sign up with email/password or using Google Sign-In.
- **Personalized Dashboard:** Upon logging in, candidates see a list of all tests they have been invited to take.
- **Seamless Test Experience:**
    - A clean, distraction-free interface for taking the exam.
    - Displays the current question, progress bar, and a countdown timer.
- **Automated Grading & Instant Results:**
    - Upon submission, the test is automatically graded.
    - Candidates receive immediate feedback with their score, percentage, and a detailed review of their answers versus the correct ones.
- **Result History:** Candidates can view a history of all the tests they have taken.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Authentication & Database:** [Firebase](https://firebase.google.com/) (Auth & Firestore)
- **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Form Management:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for validation
- **Icons:** [Lucide React](https://lucide.dev/)

## Project Structure

The project follows a standard Next.js App Router structure.

```
/src
├── app/                  # Main application routes
│   ├── (auth)/           # Route group for auth pages (login, signup)
│   ├── admin/            # Route group for all admin-facing pages
│   │   ├── dashboard/
│   │   ├── exams/
│   │   └── ...
│   ├── candidate/        # Route group for all candidate-facing pages
│   │   ├── dashboard/
│   │   └── ...
│   ├── globals.css       # Global styles
│   └── layout.tsx        # Root layout
├── components/           # Reusable components
│   ├── ui/               # ShadCN UI components
│   └── logo.tsx
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and libraries
│   ├── firebase.ts       # Firebase configuration and initialization
│   └── utils.ts          # General utility functions (e.g., cn for classnames)
└── types/                # TypeScript type definitions
```

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Firebase Setup

1.  **Create a Firebase Project:** Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2.  **Enable Firestore and Authentication:**
    - In the Firebase console, go to **Firestore Database** and create a database in production mode.
    - Go to the **Authentication** section and enable the **Email/Password** and **Google** sign-in methods.
3.  **Get Firebase Config:**
    - In your Firebase project settings, find your web app configuration object.
    - Copy this configuration object.
4.  **Update the Project:**
    - Open the `src/lib/firebase.ts` file.
    - Replace the placeholder `firebaseConfig` object with the one you copied from your Firebase project.

### Installation & Running Locally

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application should now be running on [http://localhost:9002](http://localhost:9002).

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Lints the project files.

## Deployment

This application is configured for deployment on [Firebase App Hosting](https://firebase.google.com/docs/app-hosting). You can deploy it by connecting your repository to a Firebase App Hosting backend. The `apphosting.yaml` file contains the basic configuration for deployment.
