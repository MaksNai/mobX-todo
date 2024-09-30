import { action, computed, makeAutoObservable, observable } from "mobx";

interface Todo {
  task: string;
  isDone: boolean;
  isImportant: boolean;
}

class TodoStore {
  todos: Todo[] = [];

  constructor() {
    makeAutoObservable(this, {
      todos: observable,
      completedTodosCount: computed,
      report: computed,
      addTodo: action,
      deleteTodo: action,
    });
  }

  get completedTodosCount(): number {
    return this.todos.filter((todo) => todo.isDone).length;
  }

  get report(): string {
    if (this.todos.length === 0) return "<none>";
    const nextTodo = this.todos.find((todo) => !todo.isDone);
    return (
      `Next todo: "${nextTodo ? nextTodo.task : "<none>"}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`
    );
  }

  addTodo(task: string): void {
    this.todos.push({
      task: task,
      isDone: false,
      isImportant: false,
    });
  }

  toggleDoneTodo(index: number): void {
    this.todos = this.todos.map((todo, i) =>
      index === i ? { ...todo, isDone: !todo.isDone } : todo
    );
  }

  toggleImportantTodo(index: number): void {
    this.todos = this.todos.map((todo, i) =>
      index === i ? { ...todo, isImportant: !todo.isImportant } : todo
    );
  }

  deleteTodo(index: number): void {
    this.todos = this.todos.filter((_, i) => index !== i);
  }
}

export const todoStore = new TodoStore();
