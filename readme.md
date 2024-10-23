

# Blood Bank User Portal

## Project Overview

The Blood Bank User Portal is a web application designed to connect users with hospitals for blood donation and receiving services. It allows users to register, view hospital details, request blood, and track their donation and receiving history. The application also includes features for hospital registration, approval by admins, and user authentication.

## Features

- **User Registration and Login**: Users can create an account and log in to the system securely.
- **Hospital Registration**: Hospitals can register for access to the platform, pending admin approval.
- **Admin Dashboard**: Admins can view and manage hospital registration requests.
- **Blood Request Functionality**: Users can request blood from registered hospitals, and hospitals can confirm the receipt of blood.
- **Donation and Receiving History**: Users can view their history of blood donations and receptions, which is updated based on hospital confirmations.
- **Email Notifications**: Users and hospitals receive email notifications for registration approvals and other important updates.


## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (using Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Nodemailer
- **Environment Variables**: dotenv for managing sensitive information
- **Frontend**: React (optional for future implementation)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd blood-bank-portal
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and set the following variables:
   ```plaintext
   PORT=3000
   TOKEN_KEY=your_jwt_secret_key
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```
5. Start the server:
   ```bash
   npm start
   ```
Here's the updated README that includes all API endpoints along with the other sections. You can copy this content directly into your `README.md` file.

---



## API Endpoints

### User Endpoints

- **POST** `/api/user/register`
  - **Description**: Register a new user.
  - **Request Body**:
    ```json
    {
        "name": "John Doe",
        "address": "123 Main St",
        "country": "Country",
        "state": "State",
        "district": "District",
        "pincode": "123456",
        "phoneNumber": "1234567890",
        "email": "john@example.com",
        "gender": "Male",
        "dob": "1990-01-01",
        "bloodGroup": "O+",
        "password": "password123"
    }
    ```

- **POST** `/api/user/login`
  - **Description**: User login.
  - **Request Body**:
    ```json
    {
        "email": "john@example.com",
        "password": "password123"
    }
    ```

### Hospital Endpoints

- **POST** `/api/hospital/register`
  - **Description**: Register a new hospital.
  - **Request Body**:
    ```json
    {
        "hospitalName": "City Hospital",
        "address": {
            "street": "456 Hospital Rd",
            "city": "City",
            "state": "State",
            "postalCode": "654321"
        },
        "email": "hospital@example.com",
        "contactNumber": "0987654321",
        "password": "hospitalpass"
    }
    ```

- **POST** `/api/hospital/login`
  - **Description**: Hospital login.
  - **Request Body**:
    ```json
    {
        "email": "hospital@example.com",
        "password": "hospitalpass"
    }
    ```

- **GET** `/api/hospital/pending-requests/:id`
  - **Description**: View pending blood requests for a specific hospital.

- **POST** `/api/hospital/confirm`
  - **Description**: Confirm blood reception for a blood request.
  - **Request Body**:
    ```json
    {
        "requestId": "bloodRequestId"
    }
    ```

### Blood Endpoints

- **POST** `/api/blood/request`
  - **Description**: Request blood from a hospital.
  - **Request Body**:
    ```json
    {
        "hospitalId": "hospitalId",
        "bloodGroup": "O+",
        "quantity": 2
    }
    ```

- **GET** `/api/blood/requests`
  - **Description**: Retrieve all blood requests.

## Database Models

### User Model

```javascript
const userSchema = new mongoose.Schema({
    // Fields...
});
```

### Hospital Model

```javascript
const hospitalSchema = new mongoose.Schema({
    // Fields...
});
```

### BloodRequest Model

```javascript
const bloodRequestSchema = new mongoose.Schema({
    // Fields...
});
```

### Receiving Model

```javascript
const receivingSchema = new mongoose.Schema({
    // Fields...
});
```

## Testing

### User Registration

**Request:**
```json
{
    "name": "John Doe",
    "address": "123 Main St",
    "country": "Country",
    "state": "State",
    "district": "District",
    "pincode": "123456",
    "phoneNumber": "1234567890",
    "email": "john@example.com",
    "gender": "Male",
    "dob": "1990-01-01",
    "bloodGroup": "O+",
    "password": "password123"
}
```

### User Login

**Request:**
```json
{
    "email": "john@example.com",
    "password": "password123"
}
```

### Hospital Registration

**Request:**
```json
{
    "hospitalName": "City Hospital",
    "address": {
        "street": "456 Hospital Rd",
        "city": "City",
        "state": "State",
        "postalCode": "654321"
    },
    "email": "hospital@example.com",
    "contactNumber": "0987654321",
    "password": "hospitalpass"
}
```

### Hospital Login

**Request:**
```json
{
    "email": "hospital@example.com",
    "password": "hospitalpass"
}
```

### Blood Request

**Request:**
```json
{
    "hospitalId": "hospitalId",
    "bloodGroup": "O+",
    "quantity": 2
}
```

### Confirm Blood Reception

**Request:**
```json
{
    "requestId": "bloodRequestId"
}
```

## Workflow Architecture

### Components

1. **User**
   - Registers and logs in to the system.
   - Requests blood from hospitals.
   - Views donation and receiving history.

2. **Hospital**
   - Registers for access to the platform.
   - Logs in to manage blood requests.
   - Confirms blood reception and updates receiving history.

3. **Admin**
   - Manages hospital registrations.
   - Approves or denies hospital access.

4. **Backend Server**
   - Handles API requests from users, hospitals, and admins.
   - Interacts with the database to store and retrieve data.
   - Sends email notifications.

5. **Database**
   - Stores user, hospital, blood request, and receiving history data.

### Workflow Steps

1. **User Registration and Login**
   - Users send a registration request to the `/api/user/register` endpoint.
   - User data is validated and stored in the database.
   - Users log in via the `/api/user/login` endpoint and receive a JWT token.

2. **Hospital Registration and Approval**
   - Hospitals send a registration request to the `/api/hospital/register` endpoint.
   - Admins can view pending registrations at `/api/admin/pending-requests`.
   - Admins approve or deny requests through `/api/hospital/pending-requests/:id`.
   - Upon approval, hospitals receive confirmation via email.

3. **Blood Request from User**
   - Users send a blood request to the `/api/blood/request` endpoint.
   - The system validates the request and stores it in the database with a status of "Pending."

4. **Hospital Receives Blood Request**
   - Hospitals retrieve pending blood requests using the `/api/hospital/requests` endpoint.
   - Hospitals confirm blood reception via the `/api/hospital/confirm` endpoint.
   - Upon confirmation, the blood request status is updated to "Completed."

5. **Update Receiving History**
   - The system automatically creates a new entry in the receiving history for the user.
   - The user's receiving history is updated in the database.

### Data Flow

```plaintext
          +---------------------+
          |                     |
          |      User          |
          |                     |
          +---------------------+
                   |
                   | Register/Login
                   v
          +---------------------+
          |    Backend Server   |
          +---------------------+
                   |
                   | Validates & Stores User Data
                   v
          +---------------------+
          |     Database        |
          +---------------------+
                   |
                   |     Sends Confirmation Email
                   v
          +---------------------+
          |    Email Service    |
          +---------------------+
                   |
                   | Hospital Registration
                   v
          +---------------------+
          |    Admin Dashboard  |
          +---------------------+
                   |
                   | Approves/Deny Hospital Registration
                   v
          +---------------------+
          |     Hospital        |
          +---------------------+
                   |
                   | Receives Blood Requests
                   v
          +---------------------+
          |    Backend Server   |
          +---------------------+
                   |
                   | Updates Request Status & User History
                   v
          +---------------------+
          |     Database        |
          +---------------------+
```

### Description of the Architecture

- **User Interaction**: Users can easily register and log in to the system, initiating the interaction with the backend server, which handles their requests.
- **Hospital Registration Flow**: Hospitals are registered but require admin approval. The admin dashboard allows for easy management of registrations.
- **Blood Request Process**: Users can request blood from hospitals, and hospitals can view and confirm these requests, leading to updates in both the request status and the user's receiving history.
- **Email Notifications**: The system includes an email service to notify users and hospitals of important updates, such as approval of hospital registrations and confirmation of blood requests.

---


## Future Enhancements

- **Frontend Development**: Build a user-friendly frontend using React.
- **Improved Error Handling**: Implement more granular error handling for better user experience.
- **User Interface for Admins and Hospitals**: Create dashboards for admins and hospitals to manage their functionalities more efficiently.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any feature requests or bugs.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
