const zod = require("zod");

const createTodo = zod.object({
    title: zod.string().min(1, "Title is required"),
    description: zod.string().min(1, "Description is required"),
    completed: zod.boolean().default(false),
    dueDate: zod.string().optional(),
    priority: zod.enum(['High', 'Medium', 'Low'], {
        errorMap: () => ({ message: "Priority must be High, Medium, or Low" })
    }),
});


const updateTodo = zod.object({
    title: zod.string().min(1, "Title is required").optional(),
    description: zod.string().min(1, "Description is required").optional(),
    completed: zod.boolean().optional(),
    dueDate: zod.string().optional(),
    priority: zod.enum(['High', 'Medium', 'Low'], {
        errorMap: () => ({ message: "Priority must be High, Medium, or Low" })
    }).optional(),
});

const registerSchema = zod.object({
    username: zod.string().min(1, "Username is required"),
    email: zod.string().email("Invalid email format"),
    password: zod.string().min(6, "Password must be at least 6 characters long"),
});

const loginSchema = zod.object({
    email: zod.string().email("Invalid email format"),
    password: zod.string().min(6, "Password must be at least 6 characters long"),
});

module.exports = {
    createTodo,
    updateTodo,
    registerSchema,
    loginSchema
};
