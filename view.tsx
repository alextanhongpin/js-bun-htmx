export function Home() {
  return (
    <div>
      <h1>My Todos</h1>
      <CreateTodoForm />

      <section id="todos" hx-get="/todos" hx-trigger="load"></section>
    </div>
  );
}

export function Base({ children }) {
  return (
    <html>
      <head>
        <title>Bun Todo</title>
        {/* Setup HTMX */}
        <script
          src="https://unpkg.com/htmx.org@1.9.6"
          integrity="sha384-FhXw7b6AlE/jyjlZH5iHa/tTe9EpJ1Y55RjcgPbjeWMskSxZt1v9qkxLJWNJaGni"
          crossorigin="anonymous"
        ></script>
        {/* Setup json-ext for htmx */}
        <script src="https://unpkg.com/htmx.org/dist/ext/json-enc.js"></script>

        {/* Setup hyperscript, required for form events */}
        <script src="https://unpkg.com/hyperscript.org@0.9.11"></script>

        {/* Setup Pico CSS */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css"
        />
      </head>
      <body>
        <main class="container">{children}</main>
      </body>
    </html>
  );
}

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
      <label for="update-todo"> Bun Todo </label>
      <input id="update-todo" name="title" type="text" value={todo.title} />
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
      <label for="todo"> Bun Todo </label>
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
