import { Router } from "express";
import { habitController } from "../controllers/habitController";

const router = Router();

router.get("/", habitController.getHabits);

router.get("/:id", habitController.getHabit);

router.post("/", habitController.createHabit);

router.delete("/:id", habitController.deleteHabit);

router.post("/:id/complete", habitController.completeHabit);

router.get("/:id/history", habitController.getHabitHistory);

export default router;
