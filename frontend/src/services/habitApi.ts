import axios from "axios";

export interface Habit {
  id: number;
  title: string;
  description: string | null;
  createdAt: string;
}

export interface HabitStats {
  habitId: number;
  totalCompletions: number;
  score: number;
  message: string;
}

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const getHabits = () => {
  return api.get<Habit[]>("/habits");
};

export const createHabit = (title: string, description: string) => {
  return api.post("/habits", {
    title,
    description,
  });
};

export const deleteHabit = (id: number) => {
  return api.delete(`/habits/${id}`);
};

export const completeHabit = (id: number) => {
  return api.post(`/habits/${id}/complete`);
};

export const getHabitStats = (id: number) => {
  return api.get<HabitStats>(`/habits/${id}/stats`);
};
