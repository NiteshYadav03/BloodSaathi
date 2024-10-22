Here’s a `README.md` for your project, summarizing the work you've done so far. This document highlights the key functionalities, installation, and usage instructions.

---

# Blood Sathi - Blood Bank Portal

**Blood Sathi** is a blood bank-to-user connecting portal where users can register, view hospital details, book blood online, and use dashboards for both users and hospitals. Admins manage user and hospital access, and hospitals can register, but their dashboards only activate after admin approval.

---

## Features

- **User Registration & Login**: Users can create accounts, log in, and book blood online.
- **Admin Dashboard**: Admin has full access to manage users and hospital requests, approve or reject hospital registrations.
- **Hospital Registration**: Hospitals can register with details (email, name, address, contact number). Their access is granted only after admin approval.
- **Email Notifications**: Email is sent to hospitals upon approval or rejection by the admin, containing login credentials if approved.
- **Role-based Access**: Authentication for users, admins, and hospitals with specific roles and permissions.
- **Pending Requests**: Admin can view all pending hospital requests and take action to approve or reject them.

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Token)
- **Email Service**: Nodemailer
- **Other Libraries**: dotenv, bcryptjs

---

## Getting Started

### Prerequisites

- **Node.js** installed on your system
- **MongoDB** database connection string
- **Gmail** account with App Password enabled for sending emails

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/blood-sathi.git
   cd blood-sathi
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables. Create a `.env` file at the root of your project:

   ```
   PORT=3000
   MONGO_URI=<your-mongodb-uri>
   TOKEN_KEY=<your-jwt-secret-key>
   EMAIL_USER=<your-email-address>
   EMAIL_PASS=<your-email-app-password>
   ```

4. Run the application:

   ```bash
   npm start
   ```

---

## API Endpoints

### User

- **POST /api/user/register**: Register a new user
- **POST /api/user/login**: User login

### Admin

- **POST /api/admin/register**: Register the main admin (automatically handles only one admin)
- **POST /api/admin/login**: Admin login
- **GET /api/admin/pending-requests**: View all pending hospital requests (Admin only)
- **POST /api/admin/pending-requests/:id**: Approve or reject a specific hospital request (Admin only)

### Hospital

- **POST /api/hospital/register**: Register a new hospital (no login until admin approval)

---

## Authentication

- **JWT-Based Authentication**: Each request must include a valid JWT token in the `Authorization` header.
- **Role-Based Access Control**: Admin-only routes are protected by middleware, allowing only admins to access.

---

## Email Notifications

When a hospital request is approved or denied, an email is automatically sent using **Nodemailer**. The approval email contains login credentials for the hospital.

---

## Development Process

1. **User & Admin Registration**: Implemented registration and login functionality for users and admins, with JWT authentication.
2. **Hospital Registration**: Hospitals can register but require admin approval to activate their dashboards.
3. **Approval Workflow**: Admins can view pending hospital requests and take action. Upon approval, hospitals receive login credentials via email.
4. **Error Handling**: Implemented proper error handling, including duplicate key issues and invalid tokens.

---

## Future Enhancements

- **Blood Booking History**: Users will have the ability to track their blood booking history.
- **Donation Records**: Implement donation tracking features.
- **Improved Dashboard**: Add more details to user and hospital dashboards for better usability.

---

## Running Tests

To run tests, you can use Postman or any API testing tool. Below is how to set up authentication:

- In **Postman**, add an `Authorization` header with the value `Bearer <your-token>` for routes requiring authentication.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

For more information or help, feel free to contact:

- **Email**: ankurpunia28@gmail.com
- **GitHub**: [ankurpunia30](https://github.com/ankurpunia30)

---

Let me know if you need any modifications or additions!