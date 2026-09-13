import express from "express";
import cors from "cors";
import { prisma } from "../prisma/prisma";

const app = express();

app.use(cors());
app.use(express.json());
app.listen(3001, () => {
  console.log("Server running");
});

app.get("/habits", async (req, res) => {
  const habits = await prisma.habit.findMany({
    include: {
      completions: true,
    },
  });

  res.json(habits);
});
