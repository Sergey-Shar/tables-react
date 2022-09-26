"use strict";
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const tableRouter = require("./routes/routes");
const http = require("http");
const paginate = require("express-paginate");
const PORT = process.env.PORT || 80;
const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
}));
app.use("/api", tableRouter);
app.use(express.json());
app.use(paginate.middleware(5, 50));
app.use((err, res) => {
    res.status(500).send(err.message);
});
app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
