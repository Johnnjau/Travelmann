import express from "express";
import { readdirSync } from "fs";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";  // Use ES6 import for morgan as well
import dotenv from "dotenv";  // Use ES6 import for dotenv

dotenv.config();  // Load environment variables
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const app = express();

// db connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Connection Error: ", err));

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// route middleware
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

