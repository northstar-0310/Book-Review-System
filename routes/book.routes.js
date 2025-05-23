import express from 'express';
import { createBook, getBooks, getBookById } from '../controllers/book.controller.js';
import auth from '../middleware/auth.middleware.js';
const router = express.Router();
router.post('/books', auth, createBook);
router.get('/books', getBooks);
router.get('/books/:id', getBookById);
export default router;
