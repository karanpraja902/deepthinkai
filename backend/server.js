const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connecttoMongoDb = require("./database");
const passport = require("passport");

// Import Google strategy
require("./strategy/google.strategy");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    })
);

app.use(passport.initialize());

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/chat", require("./routes/chatRoute"));
app.use("/api/conversation", require("./routes/conversationRoute"));

app.use((error, req, res, next) => {
    console.log(`status:${error.status}`);
    res.status(500).json({ error: `error is ${error}` || "sth went wrong" });
});

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
    console.log(`frontend running on ${process.env.FRONTEND_URL}`);
    connecttoMongoDb();
});