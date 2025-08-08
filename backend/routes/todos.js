const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const { createTodo, updateTodo} = require('../verify/type');

// @desc Get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find().sort({ date: -1 });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc Create a new todo
router.post('/', async (req, res) => {
    const validation = createTodo.safeParse(req.body);
    if (!validation.success) {
        return res.status(411).json({
            message: 'Invalid input',
            errors: validation.error.flatten().fieldErrors,
        });
    }

    try {
        const newTodo = await Todo.create({
            title: validation.data.title,
            description: validation.data.description,
            completed: false,
            dueDate: validation.data.dueDate,
            priority: validation.data.priority,
        });
        res.status(201).json({
            message: 'Todo created successfully',
            todo: newTodo,
        });
    } catch (err) {
        res.status(500).json({ 
            message: 'Could not create todo',
            error: err.message 
        });
    }
});

// @desc Update a todo
router.put('/:id', async (req, res) => {
    const validation = updateTodo.safeParse(req.body);
    if (!validation.success) {
        return res.status(411).json({
            message: 'Invalid input',
            errors: validation.error.flatten().fieldErrors,
        });
    }

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            validation.data,
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        // FIX: Moved the success response outside the if block
        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc Delete a todo
router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo removed successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
