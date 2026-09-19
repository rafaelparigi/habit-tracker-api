import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  getHabits,
  createHabit,
  deleteHabit,
  completeHabit,
  getHabitStats,
} from "../services/habitApi";
import type { Habit, HabitStats } from "../services/habitApi";

function Dashboard() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [stats, setStats] = useState<Record<number, HabitStats>>({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHabits = async () => {
    try {
      setLoading(true);
      const response = await getHabits();
      setHabits(response.data);
      setError(null);
    } catch {
      setError("Failed to load habits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHabits();
  }, []);

  const handleAddHabit = async (event: FormEvent) => {
    event.preventDefault();

    if (!title.trim()) return;

    try {
      await createHabit(title, description);
      setTitle("");
      setDescription("");
      await loadHabits();
    } catch {
      setError("Failed to create habit");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteHabit(id);
      setHabits((prev) => prev.filter((habit) => habit.id !== id));
    } catch {
      setError("Failed to delete habit");
    }
  };

  const handleComplete = async (id: number) => {
    try {
      await completeHabit(id);
      await handleShowStats(id);
    } catch {
      setError("Failed to complete habit");
    }
  };

  const handleShowStats = async (id: number) => {
    try {
      const response = await getHabitStats(id);
      setStats((prev) => ({ ...prev, [id]: response.data }));
    } catch {
      setError("Failed to load habit stats");
    }
  };

  return (
    <div className="dashboard">
      <h1>Habit Tracker</h1>

      <form onSubmit={handleAddHabit} className="habit-form">
        <input
          type="text"
          placeholder="Habit title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Habit</button>
      </form>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Loading habits...</p>
      ) : habits.length === 0 ? (
        <p>No habits yet. Add one above to get started.</p>
      ) : (
        <ul className="habit-list">
          {habits.map((habit) => (
            <li key={habit.id} className="habit-item">
              <div>
                <strong>{habit.title}</strong>
                {habit.description && <p>{habit.description}</p>}
                {stats[habit.id] && (
                  <p className="habit-stats">
                    Completions: {stats[habit.id].totalCompletions} | Score:{" "}
                    {stats[habit.id].score} - {stats[habit.id].message}
                  </p>
                )}
              </div>
              <div className="habit-actions">
                <button onClick={() => handleComplete(habit.id)}>
                  Complete
                </button>
                <button onClick={() => handleShowStats(habit.id)}>Stats</button>
                <button onClick={() => handleDelete(habit.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
