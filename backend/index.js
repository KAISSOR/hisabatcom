require("dotenv").config(); // Load environment variables from .env file
const express = require("express"); // Import Express framework
const app = express(); // Create an Express application instance
const cors = require("cors"); // Import CORS middleware for cross-origin requests
const connection = require("./db"); // Import database connection module
const expenseRoutes = require('./routes/Operation/expense'); // Import user routes module
const incomeRoutes = require("./routes/Operation/income"); // Import authentication routes module
const CoSignupRoutes = require("./routes/companies"); // Import authentication routes module

connection(); // Establish database connection

app.use(express.json()); // Parse JSON body data
app.use(cors()); // Apply CORS middleware
app.use(express.static("public"));

app.use("/expense", expenseRoutes); // Mount user routes under /api/users path
app.use("/income", incomeRoutes); // Mount authentication routes under /api/auth path
app.use("/companies", CoSignupRoutes); // Mount authentication routes under /api/auth path

const port = process.env.PORT ; // Get port from environment or use default 8080
app.listen(port, () => console.log(`Listening on port ${port}...`)); // Start server and log
