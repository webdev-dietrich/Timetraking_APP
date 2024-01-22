const express = require('express');
const path = require('path');
const cors = require("cors");

const dotenv = require('dotenv');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();

var corsOptions = {
  origin: "http://localhost:5173"
};

app.use(cors(corsOptions));

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.json(path.join(__dirname, 'public', 'index.html'));
});

require("./routes/users.routes")(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    const db = require("./models");
    db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });
    });