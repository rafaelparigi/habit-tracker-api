import express from "express";
import cors from "cors";

import habitRoutes from "./routes/habitRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({
    status: "ok",
  });
});

app.use("/habits", habitRoutes);

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
