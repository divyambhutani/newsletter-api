const express = require("express");
const userRouter = require("./router/userRoute");

const app = express();

const port = process.env.PORT || 3000;

// MIDDLEWARE
app.use(express.json());

// ROUTES
app.use(userRouter);

// START SERVER
app.listen(port, () => {});
