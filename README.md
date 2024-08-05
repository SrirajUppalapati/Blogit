# Blogit

Blogit is a MERN stack application designed for creating and managing blogs. This application features a comprehensive set of functionalities, including CRUD operations for blogs, notifications, and comments. It also includes trending blogs and tags, and user authentication using JWT and access tokens. Blogit utilizes EditorJS for blog creation, providing a user-friendly interface for content creation.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)

## Features

- **Comprehensive Blog Management**: Implemented with React and Redux, Blogit allows users to create, read, update, and delete blogs. Each blog post can be enriched with rich text content using EditorJS.
- **User Authentication**: Secure user authentication is managed using JSON Web Tokens (JWT) and bcrypt for password hashing, ensuring secure login and data protection.
- **Real-time Notifications**: Users receive real-time notifications for various actions, such as new comments or likes, using Socket.io for real-time communication.
- **Trending Content**: Trending blogs and tags are dynamically updated based on user interactions, providing a constantly evolving content discovery experience.
- **Rich Text Editing**: Integration with EditorJS allows for a rich text editor experience while creating and editing blogs, making content creation intuitive and flexible.
- **State Management**: Utilizes Redux Toolkit for efficient state management, ensuring a smooth and consistent user experience across the application.
- **RESTful APIs**: Provides 25 robust RESTful APIs for various operations, supporting over 1500 users and more than 2000 blogs.
- **Responsive Design**: The application is optimized for various screen sizes using Tailwind CSS, ensuring a seamless experience on both desktop and mobile devices.

## Technologies Used

### Frontend
- React
- Redux Toolkit
- React Router DOM
- React Hook Form
- Axios
- Tailwind CSS
- EditorJS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT

### Development Tools
- Vite
- ESLint
- Nodemon

## Installation

### Prerequisites
- MongoDB
- Express.js
- React
- Node.js

### Backend Setup
1. Clone the repository:
    ```bash
    git clone (https://github.com/SrirajUppalapati/Blogit.git)
    cd blogit/server
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the `server` directory and add the following:
    ```env
    PORT
    DATABASE
    JWT_SECRET
    JWT_EXPIRES_IN
    ```
4. Start the server:
    ```bash
    npm start
    ```

### Frontend Setup
1. Navigate to the `client` directory:
    ```bash
    cd ../client
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
4. Create a `.env` file in the `client` directory and add the following:
    ```env
    VITE_API_URL
    VITE_FIREBASE_API_KEY
    ```
5. Start the development server:
    ```bash
    npm run dev
    ```

## Usage
1. User Registration and Login: Easily register a new account or log in with existing credentials. Authentication is secure, utilizing JWT to protect user data and ensure a seamless login experience.
2. Blog Management: Utilize an intuitive interface to create new blogs, read existing ones, update content, or delete posts. The rich text editor provided by EditorJS facilitates versatile and engaging content creation.
3. Trending Content: Discover and interact with trending blogs and tags. The application dynamically updates trending lists based on user activity, enhancing content visibility and engagement
4. Real-time Notifications: Stay informed with real-time notifications for various actions, including new comments, likes, and other interactions. Notifications are delivered instantly, keeping users updated on important activities.
5. User Profile and Settings: Manage your personal profile and account settings with ease. Update profile information, change passwords, and configure preferences to customize your experience and maintain account security.
