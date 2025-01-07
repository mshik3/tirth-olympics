# Tirth Olympics

Tirth Olympics is a web application designed to manage and display scores for a Beer Olympics tournament. The application features a mobile-first design with a responsive scoreboard and an admin page for updating scores.

## Features

- **Scoreboard:** Displays rankings from 1st to 12th place, updating in real-time.
- **Admin Page:** Password-protected page for updating scores, participant names, sports, and teams.

## Technologies Used

- **Frontend:** React, React Router
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- PostgreSQL installed and running

### Local Development

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/tirth-olympics.git
   cd tirth-olympics
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up the Database:**

   - Create a PostgreSQL database named `tirth_olympics`.
   - Create a `scores` table using the following SQL:

     ```sql
     CREATE TABLE scores (
         id SERIAL PRIMARY KEY,
         name VARCHAR(100),
         points INTEGER,
         sport VARCHAR(100),
         team VARCHAR(100)
     );
     ```

4. **Run the Backend Server:**

   ```bash
   node server.js
   ```

5. **Run the Frontend Application:**

   ```bash
   npm start
   ```

6. **Access the Application:**

   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5001/api/scores`

## Contributing

Feel free to submit issues or pull requests for improvements.

## License

This project is licensed under the MIT License.
