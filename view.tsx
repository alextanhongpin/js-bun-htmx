export function Todo({ todo }) {
  return (
    <li>
      {todo.title}
      <button
        hx-get={`/todos/${todo.id}`}
        hx-target="closest li"
        hx-swap="outerHTML"
      >
        Edit
      </button>
      <button
        hx-delete={`/todos/${todo.id}`}
        hx-target="closest li"
        hx-swap="outerHTML"
      >
        Delete
      </button>
    </li>
  );
}

export function Todos({ todos }) {
  return todos.length ? (
    <ul>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ul>
  ) : (
    "No todos found"
  );
}

export function UpdateTodoForm({ todo }) {
  return (
    <form
      hx-patch={`/todos/${todo.id}`}
      hx-ext="json-enc" // converts the form to JSON based on input name, e.g. {"title": "..."}
    >
      <label htmlFor="update-todo"> Bun Todo </label>
      <input
        id="update-todo"
        name="title"
        type="text"
        defaultValue={todo.title}
      />
      <button type="submit">Update Todo</button>
    </form>
  );
}

export function CreateTodoForm() {
  return (
    <form
      hx-post="/todos"
      hx-target="#todos"
      hx-ext="json-enc" // converts the form to JSON based on input name, e.g. {"title": "..."}
      _="on submit target.reset()" // resets the input field
    >
      <label htmlFor="todo"> Bun Todo </label>
      <input
        id="todo"
        name="title"
        type="text"
        aria-label="create todo"
        placeholder="New todo"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}
