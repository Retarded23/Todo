const zod=require("zod");

const createTodo = zod.object({
  title: zod.string(),
  description: zod.string()
});

const updateTodo = zod.object({
  id: zod.string()
});

// Export using CommonJS
module.exports = {
  createTodo,
  updateTodo
};