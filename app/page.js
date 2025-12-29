"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const userId =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("uid")
      : null;

  useEffect(() => {
    fetch("/api/tasks")
      .then(res => res.json())
      .then(setTasks);
  }, []);

  if (!userId) {
    return (
      <a href="/api/auth/login">
        Login with Whop
      </a>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Daily Tasks</h2>

      {tasks.map(task => (
        <form
          key={task.id}
          action="/api/submit"
          method="POST"
          encType="multipart/form-data"
        >
          <input type="hidden" name="user_id" value={userId} />
          <input type="hidden" name="task_id" value={task.id} />

          <p>{task.title}</p>
          <input type="file" name="file" required />
          <button type="submit">Submit proof</button>
        </form>
      ))}
    </div>
  );
            }
