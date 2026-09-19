import { prisma } from "../prisma";

export const habitService = {
  getAllHabits: async () => {
    return prisma.habit.findMany({
      include: {
        completions: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  getHabitById: async (id: number) => {
    return prisma.habit.findUnique({
      where: { id },
      include: {
        completions: true,
      },
    });
  },

  createHabit: async (title: string, description?: string) => {
    return prisma.habit.create({
      data: {
        title,
        description: description ?? null,
      },
    });
  },

  deleteHabit: async (id: number) => {
    return prisma.habit.delete({
      where: { id },
    });
  },

  completeHabit: async (id: number) => {
    return prisma.habitCompletion.create({
      data: {
        habitId: id,
      },
    });
  },

  getHabitHistory: async (id: number) => {
    return prisma.habitCompletion.findMany({
      where: {
        habitId: id,
      },
      orderBy: {
        completionDate: "desc",
      },
    });
  },

  getHabitStats: async (id: number) => {
    const habit = await prisma.habit.findUnique({
      where: { id },
      include: {
        completions: true,
      },
    });

    if (!habit) {
      throw new Error("Habit not found");
    }

    const totalCompletions = habit.completions.length;

    const score = Math.min(totalCompletions * 10, 100);

    let message = "Needs improvement";

    if (score >= 80) {
      message = "Excellent consistency";
    } else if (score >= 50) {
      message = "Good progress";
    }

    return {
      habitId: habit.id,
      totalCompletions,
      score,
      message,
    };
  },
};
