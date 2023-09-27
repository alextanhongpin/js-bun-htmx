interface Todo {
  id: number;
  title: string;
  done: boolean;
}

let _id = 0;
function nextId() {
  return ++_id;
}

class TodoService {
  todos: Todo[];
  constructor() {
    this.todos = [];
  }

  add(title: string) {
    if (!title) {
      throw new Error("title cannot be empty");
    }

    this.todos.push({
      id: nextId(),
      title,
    });
  }

  find(id: number): Todo | null {
    return this.todos.find((todo) => todo.id === id);
  }

  delete(id: number) {
    const index = this.todos.find((todo) => todo.id === id);
    if (index < 0) return;

    this.todos.splice(index, 1);
  }

  update(todo: Todo) {
    this.todos = this.todos.map((it) => {
      return it.id === todo.id ? { ...it, ...todo } : it;
    });
  }
}

export function createTodoService() {
  return new TodoService();
}
