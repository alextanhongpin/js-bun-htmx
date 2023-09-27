import { Hono } from "hono";
import { renderToString } from "react-dom/server";
import { createTodoService } from "./model";
import { Todo, Todos, CreateTodoForm, UpdateTodoForm } from "./view";

const todoService = createTodoService();

const app = new Hono();
app.get("/", (c) => c.html(base(renderToString(<Home />))));
app.get("/todos", (c) =>
  c.html(renderToString(<Todos todos={todoService.todos} />))
);
app.get("/todos/:id", (c) => {
  const id = Number(c.req.param("id"));
  const todo = todoService.find(id);
  return c.html(renderToString(<UpdateTodoForm todo={todo} />));
});
app.patch("/todos/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const { title } = await c.req.json();
  todoService.update({ id, title });

  const todo = todoService.find(id);
  return c.html(renderToString(<Todo todo={todo} />));
});
app.post("/todos", async (c) => {
  const { title } = await c.req.json();
  todoService.add(title);
  return c.html(renderToString(<Todos todos={todoService.todos} />));
});
app.delete("/todos/:id", async (c) => {
  const id = c.req.param("id");
  todoService.delete(id);
  return c.html("");
});

function Home() {
  return (
    <div>
      <h1>My Todos</h1>
      <CreateTodoForm />

      <section id="todos" hx-get="/todos" hx-trigger="load"></section>
    </div>
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
    <main class='container'>
        ${component}
    </main>
  </body>
</html>
`;
}

export default {
  port: 3000,
  fetch: app.fetch,
};
