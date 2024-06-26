import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { authorRouter } from "./author/author.router";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/authors", authorRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
