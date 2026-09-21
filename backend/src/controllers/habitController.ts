import type { Request, Response } from "express";
import { habitService } from "../services/habitService";

export const habitController = {
  getHabits: async (_req: Request, res: Response) => {
    try {
      const habits = await habitService.getAllHabits();

      res.json(habits);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to retrieve habits",
      });
    }
  },

  getHabit: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const habit = await habitService.getHabitById(id);

      if (!habit) {
        return res.status(404).json({
          message: "Habit not found",
        });
      }

      res.json(habit);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to retrieve habit",
      });
    }
  },

  createHabit: async (req: Request, res: Response) => {
    try {
      const { title, description } = req.body;

      if (!title) {
        return res.status(400).json({
          message: "Title is required",
        });
      }

      const habit = await habitService.createHabit(title, description);

      res.status(201).json(habit);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to create habit",
      });
    }
  },

  deleteHabit: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      await habitService.deleteHabit(id);

      res.sendStatus(204);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to delete habit",
      });
    }
  },

  completeHabit: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const completion = await habitService.completeHabit(id);

      res.status(201).json(completion);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to complete habit",
      });
    }
  },

  getHabitHistory: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const history = await habitService.getHabitHistory(id);

      res.json(history);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to retrieve history",
      });
    }
  },

  getHabitStats: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const stats = await habitService.getHabitStats(id);

      res.json(stats);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to retrieve statistics",
      });
    }
  },
};
