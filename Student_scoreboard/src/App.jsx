import { useState } from "react";

export default function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Aman", score: 78 },
    { id: 2, name: "Riya", score: 45 },
    { id: 3, name: "Karan", score: 90 },
  ]);

  const [name, setName] = useState("");
  const [score, setScore] = useState("");

  // Add student
  const addStudent = () => {
    if (!name || score === "") return;

    const newStudent = {
      id: Date.now(),
      name,
      score: Number(score),
    };

    setStudents([...students, newStudent]);
    setName("");
    setScore("");
  };

  // Update score
  const updateScore = (id, newScore) => {
    const updated = students.map((s) =>
      s.id === id ? { ...s, score: Number(newScore) } : s
    );
    setStudents(updated);
  };

  // Stats
  const total = students.length;
  const passed = students.filter((s) => s.score >= 40).length;
  const avg =
    students.reduce((acc, s) => acc + s.score, 0) / students.length || 0;

  return (
    <div className="container">
      <h1>Student Scoreboard</h1>

      {/* Add Student */}
      <div className="form glass">
        <input
          type="text"
          placeholder="Student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Score (0-100)"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />

        <button onClick={addStudent}>Add</button>
      </div>

      {/* Stats */}
      <div className="stats">
        <div className="glass">Total: {total}</div>
        <div className="glass">Passed: {passed}</div>
        <div className="glass">Avg: {avg.toFixed(0)}</div>
      </div>

      {/* Table */}
      <div className="table-box glass">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.score}</td>

                <td className={s.score >= 40 ? "pass" : "fail"}>
                  {s.score >= 40 ? "Pass" : "Fail"}
                </td>

                <td>
                  <input
                    type="number"
                    defaultValue={s.score}
                    onBlur={(e) => updateScore(s.id, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
