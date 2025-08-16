// routes/todos.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Todo = require('../models/Todo');
const { createTodo, updateTodo } = require('../verify/type');

const JWT_SECRET = process.env.JWT_SECRET;

// helper: get userId from Authorization header
function getUserIdFromRequest(req, res) {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    res.status(401).json({ msg: 'No token, authorization denied' });
    return null;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET); // { userId: ... }
    return decoded.userId;
  } catch {
    res.status(401).json({ msg: 'Token is not valid' });
    return null;
  }
}

// @desc Get all todos for current user
router.get('/', async (req, res) => {
  const userId = getUserIdFromRequest(req, res);
  if (!userId) return;

  try {
    const todos = await Todo.find({ userId }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc Create a new todo for current user
router.post('/', async (req, res) => {
  const userId = getUserIdFromRequest(req, res);
  if (!userId) return;

  const validation = createTodo.safeParse(req.body);
  if (!validation.success) {
    return res.status(411).json({
      message: 'Invalid input',
      errors: validation.error.flatten().fieldErrors
    });
  }

  try {
    const newTodo = await Todo.create({
      title: validation.data.title,
      description: validation.data.description,
      completed: false,
      dueDate: validation.data.dueDate,
      priority: validation.data.priority,
      userId
    });

    res.status(201).json({
      message: 'Todo created successfully',
      todo: newTodo
    });
  } catch (err) {
    res.status(500).json({
      message: 'Could not create todo',
      error: err.message
    });
  }
});

// @desc Update a todo (only if owned by current user)
router.put('/:id', async (req, res) => {
  const userId = getUserIdFromRequest(req, res);
  if (!userId) return;

  const validation = updateTodo.safeParse(req.body);
  if (!validation.success) {
    return res.status(411).json({
      message: 'Invalid input',
      errors: validation.error.flatten().fieldErrors
    });
  }

  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    Object.assign(todo, validation.data);
    await todo.save();

    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc Delete a todo (only if owned by current user)
router.delete('/:id', async (req, res) => {
  const userId = getUserIdFromRequest(req, res);
  if (!userId) return;

  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    res.json({ message: 'Todo removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
