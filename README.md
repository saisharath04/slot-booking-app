
# Slot Booking App for Sports Company

This project implements a slot booking system for a sports company, with the frontend developed using **React + TypeScript** and the backend built with **Node.js** and **Express.js**. The project uses **MySQL** as the database, hosted on **Aiven** ([Aiven Console](https://console.aiven.io/)).

## Frontend Setup

- **Website link**: [Slot Booking App](https://slot-booking-project-frontend.onrender.com/)
- The front end is deployed on Render.

### Local Setup for Frontend

To set up the frontend locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/saisharath04/slot-booking-project.git
   ```

2. Navigate to the frontend directory:

   ```bash
   cd slot-booking-project/sports_booking_app_frontend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run start
   ```

   The frontend was manually deployed on Netlify by creating a production build.

## Backend Setup

- **Deployed URL**: [Backend API](https://slot-booking-project-backend.onrender.com)
- The backend is deployed on Render.

### Local Setup for Backend

To set up the backend locally, follow these steps:

1. Navigate to the backend directory:

   ```bash
   cd slot-booking-project/sports_booking_app_backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server using **Nodemon**:

   ```bash
   npm run dev
   ```

   Or, you can build and run the server using:

   ```bash
   npm run build
   npm run start
   ```

### Committing and Pushing Changes

When pushing changes to the backend (including the `dist` folder), follow these steps:

```bash
git add .
git commit -m "Your commit message"
git push
```

make sure need to push updated dist for any new changes
