import { Hono } from "hono";
import { renderToString } from "react-dom/server";

const todos = [
  {
    title: "learn bun",
    done: false,
  },
];

const app = new Hono();
app.get("/", (c) => c.html(base(renderToString(<Home />))));
app.get("/todos", (c) => c.html(renderToString(<Todos todos={todos} />)));
app.post("/todos", async (c) => {
  const todo = await c.req.json();
  todos.push(todo);
  return c.html(renderToString(<Todos todos={todos} />));
});

function Home() {
  return (
    <div>
      <h1>Hello World</h1>
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

      <section id="todos" hx-get="/todos" hx-trigger="load"></section>
    </div>
  );
}

function Todos({ todos }) {
  return todos.length ? (
    <ul>
      {todos.map((todo) => (
        <li key={todo.title}>{todo.title}</li>
      ))}
    </ul>
  ) : (
    "No todos found"
  );
}

function base(component) {
  return `<!DOCTYPE html>
<html>
  <head>
    <title>Bun Todo</title>
    <!--Setup HTMX-->
    <script
      src="https://unpkg.com/htmx.org@1.9.6"
      integrity="sha384-FhXw7b6AlE/jyjlZH5iHa/tTe9EpJ1Y55RjcgPbjeWMskSxZt1v9qkxLJWNJaGni"
      crossorigin="anonymous"
    ></script>
    <!--Setup json-ext for htmx-->
    <script src="https://unpkg.com/htmx.org/dist/ext/json-enc.js"></script>

    <!--Setup hyperscript, required for form events-->
    <script src="https://unpkg.com/hyperscript.org@0.9.11"></script>
    <!--Setup Pico CSS-->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css"
    />
  </head>
  <body>
    ${component}
  </body>
</html>
`;
}

export default {
  port: 3000,
  fetch: app.fetch,
};
