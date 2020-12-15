import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./routes/index";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", router);
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Green Lamp world");
});

app.listen(port, () => {
  console.log(`Server Running on: ${port}`);
});

export default app;
