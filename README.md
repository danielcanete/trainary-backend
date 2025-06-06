# Express Clerk Drizzle Backend

This project is a backend application built with Express, Clerk for authentication, and Drizzle for database management. It provides a robust foundation for building web applications with user authentication and database interactions.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd express-clerk-drizzle-backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the application, run the following command:
```
npm start
```

The application will be running on `http://localhost:3000` by default.

## Environment Variables

Create a `.env` file in the root directory and add the following variables (use `.env.example` as a reference):

```
DATABASE_URL=<your-database-url>
CLERK_API_KEY=<your-clerk-api-key>
```

## Folder Structure

```
express-clerk-drizzle-backend
├── src
│   ├── app.js               # Entry point of the application
│   ├── config
│   │   └── database.js      # Database connection configuration
│   ├── controllers
│   │   └── index.js         # Controller functions for business logic
│   ├── middlewares
│   │   ├── auth.js          # Authentication middleware using Clerk
│   │   └── errorHandler.js   # Error handling middleware
│   ├── models
│   │   └── schema.js        # Database schema definitions
│   ├── routes
│   │   └── index.js         # Route definitions
│   └── utils
│       └── index.js         # Utility functions
├── .env.example              # Example environment variables
├── .gitignore                # Files to ignore in Git
├── package.json              # NPM configuration file
└── README.md                 # Project documentation
```

## License

This project is licensed under the MIT License.