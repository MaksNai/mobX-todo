"use client";

import { todoStore } from "@/libs/mobx";
import { observer } from "mobx-react-lite";
import { useCallback, useState } from "react";
import styles from "./page.module.css";

function Home() {
  const [newTask, setNewTask] = useState<string>("");

  const handleAddToDo = useCallback(() => {
    todoStore.addTodo(newTask);
    setNewTask("");
  }, [newTask]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.navTask}>
            <h3 className={styles.navHeader}>Set new task</h3>
            <input
              type="text"
              className={styles.inputTask}
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button className={styles.buttonAddTask} onClick={handleAddToDo}>
              Add task
            </button>
          </div>
          <div className={styles.taskList}>
            {todoStore.todos.length > 0 ? (
              todoStore.todos.map((todo, index) => (
                <div
                  key={index}
                  className={`${styles.taskItem} ${
                    todo.isImportant ? styles.important : ""
                  }`}
                >
                  <span
                    className={`${styles.taskText} ${
                      todo.isDone ? styles.completed : ""
                    }`}
                  >
                    {todo.task}
                  </span>
                  <div className={styles.taskActions}>
                    <button
                      className={styles.actionButton}
                      onClick={() => todoStore.toggleDoneTodo(index)}
                    >
                      {todo.isDone ? "Undo" : "Done"}
                    </button>
                    <button
                      className={styles.actionButton}
                      onClick={() => todoStore.toggleImportantTodo(index)}
                    >
                      {todo.isImportant ? "Unmark" : "Important"}
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => todoStore.deleteTodo(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No tasks available</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default observer(Home);
