import type { Request, Response } from "express";
import { habitService } from "../services/habitService";

export const habitController = {
  async getHabits(_req: Request, res: Response) {
    const habits = await habitService.getAllHabits();

    res.json(habits);
  },

  async getHabit(req: Request, res: Response) {
    const id = Number(req.params.id);

    const habit = await habitService.getHabitById(id);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    res.json(habit);
  },

  async createHabit(req: Request, res: Response) {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const habit = await habitService.createHabit(title, description);

    res.status(201).json(habit);
  },

  async deleteHabit(req: Request, res: Response) {
    const id = Number(req.params.id);

    await habitService.deleteHabit(id);

    res.sendStatus(204);
  },

  async completeHabit(req: Request, res: Response) {
    const id = Number(req.params.id);

    const completion = await habitService.completeHabit(id);

    res.status(201).json(completion);
  },

  async getHabitHistory(req: Request, res: Response) {
    const id = Number(req.params.id);

    const history = await habitService.getHabitHistory(id);

    res.json(history);
  },
};
