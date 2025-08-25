
# Examplify: A Modern Computer-Based Test (CBT) Platform - Project Report

## CHAPTER 1: INTRODUCTION

### 1.1 Background of the Study

The digital transformation of education and professional assessment has accelerated the need for robust, secure, and efficient online examination systems. Traditional paper-based testing methods are often logistically complex, resource-intensive, and difficult to scale. Early versions of Computer-Based Test (CBT) systems, while an improvement, frequently suffered from poor user interfaces, security vulnerabilities, and a lack of scalability.

As educational institutions and corporate entities increasingly adopt remote learning and hiring practices, the demand for a modern web-based platform that can handle secure authentication, seamless test administration, automated grading, and insightful analytics has become paramount. Examplify is designed to address these needs by leveraging a modern technology stack to provide a reliable and user-friendly solution for online examinations.

### 1.2 Problem Statement

Educational institutions and organizations face significant challenges in conducting examinations online. Key problems include:

1.  **Security and Integrity:** Ensuring that tests are taken by the right person and preventing cheating is a major concern.
2.  **Scalability:** Systems must be able to handle a high number of concurrent users without performance degradation.
3.  **User Experience:** Both test administrators and candidates require an intuitive, reliable, and distraction-free interface.
4.  **Administrative Overhead:** The process of creating tests, inviting candidates, grading, and analyzing results is often time-consuming and prone to human error.
5.  **Lack of Immediate Feedback:** Candidates often have to wait for long periods to receive their results, and administrators lack immediate access to performance data.

A modern, integrated platform is required to solve these issues, providing an end-to-end solution for the entire examination lifecycle.

### 1.3 Aim and Objectives

**Aim:** The primary aim of this project is to design, develop, and implement a secure, scalable, and full-stack web application named "Examplify" that facilitates the creation, management, and execution of online computer-based tests.

**Objectives:**

1.  To develop a secure authentication system with distinct roles for "Admins" and "Candidates".
2.  To implement a comprehensive admin dashboard for managing tests, questions, candidate invitations, and viewing system-wide statistics.
3.  To create a user-friendly test builder that allows administrators to easily construct exams with multiple-choice questions and set time limits.
4.  To design a seamless and timed test-taking interface for candidates that is both intuitive and resilient.
5.  To provide instant, automated grading upon test submission and present detailed results and performance feedback to candidates.
6.  To build the application using a modern, robust technology stack (Next.js, Firebase, Tailwind CSS) to ensure performance, security, and maintainability.

### 1.4 Scope of the Project

The project encompasses the complete lifecycle of an online examination process. This includes:

*   **User Management:** Secure sign-up and login for both administrators and candidates.
*   **Admin Functionality:** Creation, editing, and deletion of tests; management of questions and answers; invitation of candidates to specific tests; and viewing of all test results.
*   **Candidate Functionality:** A personalized dashboard showing invited tests, a real-time test-taking environment with a countdown timer, and a detailed results page upon completion.
*   **Technology:** The application is a full-stack web application built from the ground up, not an integration with an existing Learning Management System (LMS).

The project's scope does not include features like proctoring, support for question types other than multiple-choice, or public test access without an invitation.

---

## CHAPTER 2: LITERATURE REVIEW

### 2.1 Existing Systems

The landscape of online examination platforms includes a wide range of solutions, from large-scale commercial products to open-source tools.

*   **Commercial Platforms (e.g., Mettl, TestGorilla):** These are feature-rich platforms that offer advanced functionalities like AI-powered proctoring, a vast library of pre-built tests, and sophisticated anti-cheating mechanisms. However, they often come with high subscription costs, which can be a barrier for smaller institutions.
*   **Learning Management Systems (LMS) (e.g., Moodle, Canvas):** Many LMS platforms include a quizzing module. While well-integrated into the broader educational ecosystem, their testing features can be less specialized and may lack the robust security and scalability of dedicated assessment platforms.
*   **Open-Source Tools (e.g., TCExam):** These offer a cost-effective alternative and allow for customization. However, they can be complex to set up and maintain, often requiring significant technical expertise. Their user interfaces and feature sets may also lag behind modern commercial offerings.

The development of Examplify is motivated by the gap in the market for a solution that is both modern and accessible, providing the core functionalities of a dedicated CBT platform without the high cost of enterprise solutions or the maintenance overhead of older open-source tools.

### 2.2 Core Technologies

The technology stack for Examplify was chosen to ensure a high-quality, modern, and scalable application.

*   **Next.js (React Framework):** Next.js is a leading React framework that enables server-side rendering (SSR) and static site generation (SSG), which leads to better performance and SEO. Its App Router paradigm simplifies routing and layouts, while Server Components reduce the amount of client-side JavaScript, resulting in faster load times.
*   **Firebase (Backend-as-a-Service):** Firebase provides a suite of tools for building web and mobile applications. For Examplify, it serves multiple critical functions:
    *   **Firebase Authentication:** Offers a secure and easy-to-implement solution for user management, including email/password and social providers like Google Sign-In.
    *   **Firestore:** A NoSQL, cloud-hosted database that is highly scalable and provides real-time data synchronization. It is ideal for storing user data, tests, and results.
*   **Tailwind CSS & Shadcn/ui:** For styling, Tailwind CSS is used for its utility-first approach, which allows for rapid development of custom designs without writing custom CSS. Shadcn/ui is a component library built on top of Tailwind CSS that provides a set of beautifully designed, accessible, and reusable components, which significantly accelerates UI development.

This combination of technologies allows for the rapid development of a full-stack application that is performant, scalable, and maintainable.

---

## CHAPTER 3: SYSTEM ANALYSIS AND DESIGN

### 3.1 Software Development Methodology

The project was developed using an **Agile development methodology**. This iterative approach allowed for flexibility and rapid prototyping. The development process was broken down into small, manageable sprints, with each sprint focused on delivering a specific set of features (e.g., authentication, test creation, test-taking). This methodology enabled continuous feedback and refinement, ensuring the final product is well-aligned with the project objectives.

### 3.2 System Requirements

#### 3.2.1 Functional Requirements

*   **FR1: User Authentication**
    *   FR1.1: Users must be able to sign up as either an "Admin" or a "Candidate".
    *   FR1.2: Users must be able to log in using their email/password or Google account.
    *   FR1.3: The system must enforce role-based access control, redirecting users to the appropriate dashboard upon login.
*   **FR2: Admin Test Management**
    *   FR2.1: Admins must be able to create new tests, specifying a title, description, and duration.
    *   FR2.2: Admins must be able to add multiple-choice questions to a test, define options, and mark the correct one.
    *   FR2.3: Admins must be able to view, edit, and delete existing tests.
*   **FR3: Candidate Management**
    *   FR3.1: Admins must be able to invite one or more candidates to a test via email.
*   **FR4: Test-Taking**
    *   FR4.1: Candidates must see a list of tests they are invited to on their dashboard.
    *   FR4.2: The test interface must display one question at a time.
    *   FR4.3: A countdown timer must be visible during the test.
    *   FR4.4: The test must auto-submit when the timer runs out.
*   **FR5: Results and Grading**
    *   FR5.1: The system must automatically grade the test upon submission.
    *   FR5.2: Candidates must be able to view their score, percentage, and a detailed review of their answers immediately after submission.
    *   FR5.3: Admins must be able to view a list of all submitted results.

#### 3.2.2 Non-Functional Requirements

*   **NFR1: Performance:** The application should load quickly and handle concurrent test sessions without noticeable lag.
*   **NFR2: Security:** All data transmission should be encrypted. User passwords must be securely hashed. Firestore security rules must be implemented to prevent unauthorized data access.
*   **NFR3: Usability:** The user interface for both admin and candidate flows should be intuitive and easy to navigate.
*   **NFR4: Reliability:** The application should have high availability and data should be backed up automatically (a feature of Firestore).

### 3.3 System Architecture and Design

The application follows a **client-server architecture** where the Next.js frontend acts as the client and Firebase serves as the backend.

#### 3.3.1 Database Schema (Firestore)

The data is organized into four main collections:

1.  **`users`**: Stores user profile information.
    *   `uid` (Document ID)
    *   `name`: (string)
    *   `email`: (string)
    *   `role`: (string: "admin" or "candidate")
    *   `createdAt`: (timestamp)

2.  **`tests`**: Stores the structure and content of each test.
    *   `testId` (Document ID)
    *   `title`: (string)
    *   `description`: (string)
    *   `duration`: (number, in minutes)
    *   `questions`: (array of objects)
        *   `text`: (string)
        *   `options`: (array of objects: `{text: string}`)
        *   `correctOptionIndex`: (number)

3.  **`invitations`**: Links candidates to tests they are allowed to take.
    *   `invitationId` (Document ID)
    *   `candidateEmail`: (string)
    *   `testId`: (string)
    *   `status`: (string: "invited", "completed")

4.  **`results`**: Stores the outcome of each completed test.
    *   `resultId` (Document ID)
    *   `testId`: (string)
    *   `testTitle`: (string)
    *   `candidateId`: (string)
    *   `candidateEmail`: (string)
    *   `answers`: (array of objects)
    *   `score`: (number)
    *   `totalQuestions`: (number)
    *   `submittedAt`: (timestamp)


---

## CHAPTER 4: IMPLEMENTATION

### 4.1 Tools and Technologies

*   **Frontend:** Next.js 15, React 18, Tailwind CSS
*   **Backend:** Firebase (Authentication, Firestore)
*   **UI Components:** Shadcn/ui, Lucide React (for icons)
*   **Form Management:** React Hook Form, Zod (for validation)
*   **Language:** TypeScript
*   **Development Environment:** Visual Studio Code, Node.js
*   **Deployment:** Firebase App Hosting (or any Node.js compatible platform)

### 4.2 Code Structure

The project is organized using the Next.js App Router paradigm, which promotes a clear and scalable file structure.

```
/src
├── app/                  # Main application routes
│   ├── (auth)/           # Route group for auth pages (login, signup)
│   ├── admin/            # Route group for all admin-facing pages
│   ├── candidate/        # Route group for all candidate-facing pages
│   ├── globals.css       # Global styles
│   └── layout.tsx        # Root layout
├── components/           # Reusable React components
│   ├── ui/               # ShadCN UI components
│   └── logo.tsx
├── hooks/                # Custom React hooks (e.g., use-toast)
├── lib/                  # Utility functions and libraries
│   ├── firebase.ts       # Firebase configuration and initialization
│   └── utils.ts          # General utility functions
└── types/                # TypeScript type definitions
```

### 4.3 Key Implementation Details

#### 4.3.1 Authentication Flow

The authentication logic is primarily handled in `src/app/(auth)/`. The sign-up page (`signup/page.tsx`) uses the `createUserWithEmailAndPassword` function from Firebase Auth. Upon successful creation, it creates a corresponding user document in the `users` Firestore collection with the selected role. The login page (`login/page.tsx`) authenticates the user and then fetches their document from Firestore to determine their role, redirecting them to the appropriate dashboard (`/admin/dashboard` or `/candidate/dashboard`).

#### 4.3.2 Test Creation and Management

The `src/app/admin/exams/` directory contains the logic for test management. The `create/page.tsx` file uses `react-hook-form` to manage the complex form state for creating a test with multiple questions and options. When the form is submitted, it first creates a new document in the `tests` collection. Then, it parses the list of invited emails and creates corresponding documents in the `invitations` collection in a single Firestore batch write for atomicity.

#### 4.3.3 Test-Taking Engine

The core of the candidate experience is in `src/app/candidate/exams/[examId]/page.tsx`. This component fetches the test data from Firestore based on the URL parameter. It manages the state for the current question index, the user's answers, and the countdown timer. The timer is implemented using a `useEffect` hook that decrements the `timeLeft` state every second. When the timer reaches zero or the user manually submits, the component calculates the score and writes the final data to the `results` collection in Firestore.

---

## CHAPTER 5: CONCLUSION AND RECOMMENDATIONS

### 5.1 Conclusion

This project successfully achieved its aim of developing a modern, full-stack Computer-Based Test platform, Examplify. The application provides a robust and user-friendly solution for creating, managing, and taking online exams. All core objectives were met: the system features secure, role-based authentication, comprehensive admin dashboards, an intuitive test builder, and a seamless test-taking experience with instant, automated grading.

The choice of a modern technology stack—Next.js, Firebase, and Tailwind CSS—proved to be highly effective, enabling rapid development while ensuring the final product is performant, scalable, and maintainable. The application successfully addresses the key problems outlined, offering a reliable alternative to both expensive commercial platforms and outdated open-source solutions.

### 5.2 Limitations of the Project

While the project is a success, it has some limitations inherent to its scope:

1.  **Limited Question Types:** The platform currently only supports multiple-choice questions. It does not support other common types like fill-in-the-blanks, true/false, or essay questions.
2.  **No Proctoring:** The system does not include any anti-cheating or proctoring features, such as webcam monitoring or browser lockdown.
3.  **Basic Analytics:** The results reporting for administrators is functional but basic. It lacks advanced analytics, such as per-question performance analysis or cohort comparisons.
4.  **No Public Test Access:** Tests can only be taken via direct email invitation, with no option for public links or self-enrollment codes.

### 5.3 Recommendations for Future Work

Examplify provides a strong foundation that can be extended with numerous features. Future work could include:

1.  **Support for More Question Types:** Expanding the test builder to include a variety of question formats would significantly increase the platform's versatility.
2.  **Proctoring and Security Enhancements:** Integrating browser lockdown functionality or a third-party proctoring service would enhance test integrity.
3.  **Advanced Analytics Dashboard:** Developing a more sophisticated analytics dashboard for admins to track student performance, identify difficult questions, and generate detailed reports.
4.  **Test Bank and Reusability:** Allowing admins to create a bank of questions that can be reused across multiple tests.
5.  **Public and Group-Based Invitations:** Adding functionality for sharing public test links or inviting entire groups of users at once would improve flexibility.
6.  **AI-Powered Question Generation:** Integrating a generative AI model (like Gemini) to assist administrators in creating questions and alternative options based on a given topic or text.
