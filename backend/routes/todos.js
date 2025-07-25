const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

const { createTodo, updateTodo } = require('../verify/type'); 

// @desc    Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ date: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Create a new todo with Zod validation
router.post('/', async (req, res) => {
  // Validate the request body using your createTodo schema
  const validation = createTodo.safeParse(req.body);
  if (!validation.success) {
    return res.status(411).json({
      message: 'Invalid input',
      errors: validation.error.flatten().fieldErrors,
    });
  }

  // Create a new todo using the validated data
  try {
    const newTodo = await Todo.create({
      title: validation.data.title,
      description: validation.data.description,
      completed: false,
    });
    res.status(201).json({
      message: 'Todo created successfully',
      todo: newTodo,
    });
  } catch (err) {
    res.status(500).json({ message: 'Could not create todo' });
  }
});


// This route is designed to match your original goal of updating a todo by its ID.
router.put('/:id', async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const todoToUpdate = {
      title,
      description,
      completed,
    };

    // Find the todo by its ID and update it with the new data
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      todoToUpdate,
      { new: true } // This option returns the updated document
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(updatedTodo); // Send back the updated todo object

  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});


// @desc    Delete a todo
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
