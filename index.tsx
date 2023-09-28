import { Hono } from "hono";
import { createTodoController } from "./controller";
import { createTodoService } from "./model";

const service = createTodoService();
const controller = createTodoController(service);

const app = new Hono();
app.get("/", controller.index);
app.get("/todos", controller.list);
app.get("/todos/:id", controller.show);
app.patch("/todos/:id", controller.update);
app.post("/todos", controller.create);
app.delete("/todos/:id", controller.delete);

export default {
  port: 3000,
  fetch: app.fetch,
};
