import {
  Base,
  Home,
  Todo,
  Todos,
  CreateTodoForm,
  UpdateTodoForm,
} from "./view";

function TodoController(service) {
  return {
    index: (c) => {
      return c.html(
        <Base>
          <Home />
        </Base>
      );
    },

    list: (c) => {
      return c.html(<Todos todos={service.todos} />);
    },

    show: (c) => {
      const id = Number(c.req.param("id"));
      const todo = service.find(id);

      return c.html(<UpdateTodoForm todo={todo} />);
    },

    update: async (c) => {
      const id = Number(c.req.param("id"));
      const { title } = await c.req.json();
      service.update({ id, title });
      const todo = service.find(id);

      return c.html(<Todo todo={todo} />);
    },

    create: async (c) => {
      const { title } = await c.req.json();
      service.add(title);

      return c.html(<Todos todos={service.todos} />);
    },

    delete: (c) => {
      const id = c.req.param("id");
      service.delete(id);

      return c.html("");
    },
  };
}

export function createTodoController(service) {
  return new TodoController(service);
}
