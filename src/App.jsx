// App.jsx
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const defaultRoutine = {
  name: "Upper Body A",
  exercises: [
    { name: "Lat Pulldown", sets: ["", "", "", ""] },
    { name: "Dumbbell Curls", sets: ["", "", ""] },
  ],
};

export default function App() {
  const [routines, setRoutines] = useState(() => {
    const saved = localStorage.getItem("routines");
    return saved ? JSON.parse(saved) : [defaultRoutine];
  });

  const [today, setToday] = useState(() => {
    const saved = localStorage.getItem("today");
    return saved ? JSON.parse(saved) : null;
  });

  const [newRoutine, setNewRoutine] = useState("");
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : ["Drink 100oz Water", "Log Protein"];
  });

  const [photos, setPhotos] = useState(() => {
    const saved = localStorage.getItem("photos");
    return saved ? JSON.parse(saved) : [];
  });

  const [weights, setWeights] = useState(() => {
    const saved = localStorage.getItem("weights");
    return saved ? JSON.parse(saved) : [];
  });

  const [newWeight, setNewWeight] = useState("");

  const [schedule, setSchedule] = useState(() => {
    const saved = localStorage.getItem("schedule");
    return saved
      ? JSON.parse(saved)
      : {
          Monday: "Upper Body A",
          Tuesday: "Lower Body",
          Wednesday: "Rest",
          Thursday: "Upper Body B",
          Friday: "Cardio",
        };
  });

  const [darkMode, setDarkMode] = useState(false);
  const [selectedPhotoIndexes, setSelectedPhotoIndexes] = useState([]);

  useEffect(() => {
    localStorage.setItem("routines", JSON.stringify(routines));
    localStorage.setItem("today", JSON.stringify(today));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("schedule", JSON.stringify(schedule));
    localStorage.setItem("photos", JSON.stringify(photos));
    localStorage.setItem("weights", JSON.stringify(weights));
  }, [routines, today, tasks, schedule, photos, weights]);

  const logSet = (routineIdx, exerciseIdx, setIdx, value) => {
    const updated = [...routines];
    updated[routineIdx].exercises[exerciseIdx].sets[setIdx] = value;
    setRoutines(updated);
  };

  const addRoutine = () => {
    if (newRoutine.trim() === "") return;
    const newEntry = { name: newRoutine, exercises: [] };
    setRoutines([...routines, newEntry]);
    setNewRoutine("");
  };

  const updateExerciseName = (routineIdx, exerciseIdx, name) => {
    const updated = [...routines];
    updated[routineIdx].exercises[exerciseIdx].name = name;
    setRoutines(updated);
  };

  const addExercise = (routineIdx) => {
    const updated = [...routines];
    updated[routineIdx].exercises.push({ name: "", sets: ["", "", ""] });
    setRoutines(updated);
  };

  const uploadPhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotos([...photos, { date: new Date().toISOString(), url: reader.result }]);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const toggleSelectPhoto = (idx) => {
    setSelectedPhotoIndexes((prev) => {
      if (prev.includes(idx)) return prev.filter((i) => i !== idx);
      if (prev.length === 2) return [prev[1], idx];
      return [...prev, idx];
    });
  };

  const addWeight = () => {
    if (newWeight.trim() === "") return;
    setWeights([...weights, { date: new Date().toISOString(), value: parseFloat(newWeight) }]);
    setNewWeight("");
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <main className={`p-4 space-y-4 max-w-md mx-auto ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Fitness Tracker</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm">Dark Mode</span>
          <Switch checked={darkMode} onCheckedChange={() => setDarkMode(!darkMode)} />
        </div>
      </div>
      {/* UI Continues */}
    </main>
  );
}
