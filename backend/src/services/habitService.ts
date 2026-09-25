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

    let message = "";

    switch (true) {
      case totalCompletions === 0:
        message = "Make a start on your new habit";
        break;
      case totalCompletions < 33:
        message = "Excellent progress!";
        break;
      case totalCompletions < 66:
        message =
          "Well done! You are more than halfway into making your habit automatic! Keep going!";
        break;
      default:
        message =
          "Congratulations! Your new habit is now automatic. You can keep tracking it, and also create new habits!";
    }

    return {
      habitId: habit.id,
      totalCompletions,
      message,
    };
  },
};
