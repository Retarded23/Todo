const zod = require("zod");

const createTodo = zod.object({
    title: zod.string(),
    description: zod.string(),
    completed: zod.boolean().default(false),
    dueDate: zod.string().optional(),
    priority: zod.enum(['High', 'Medium', 'Low']),
});

// It's also recommended to update this for your PUT requests
const updateTodo = zod.object({
    title: zod.string().optional(),
    description: zod.string().optional(),
    completed: zod.boolean().optional(),
    // Apply the same fix here
    dueDate: zod.string().optional(),
    priority: zod.enum(['High', 'Medium', 'Low']).optional(),
});
// refine((val) => !isNaN(Date.parse(val)), {
//         message: "Invalid date format",
//     })

module.exports = {
    createTodo,
    updateTodo
};
