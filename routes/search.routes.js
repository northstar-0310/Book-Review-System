import express from 'express';
import { searchBooks } from '../controllers/search.controller.js';
const router = express.Router();
router.get('/search', searchBooks);
export default router;
