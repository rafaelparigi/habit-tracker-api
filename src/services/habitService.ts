import { prisma } from "../prisma";

export const habitService = {
  async getAllHabits() {
    return prisma.habit.findMany({
      include: {
        completions: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  async getHabitById(id: number) {
    return prisma.habit.findUnique({
      where: { id },
      include: {
        completions: true,
      },
    });
  },

  async createHabit(title: string, description?: string) {
    return prisma.habit.create({
      data: {
        title,
        description: description ?? null,
      },
    });
  },

  async deleteHabit(id: number) {
    return prisma.habit.delete({
      where: {
        id,
      },
    });
  },

  async completeHabit(id: number) {
    return prisma.habitCompletion.create({
      data: {
        habitId: id,
      },
    });
  },

  async getHabitHistory(id: number) {
    return prisma.habitCompletion.findMany({
      where: {
        habitId: id,
      },
      orderBy: {
        completionDate: "desc",
      },
    });
  },
};
