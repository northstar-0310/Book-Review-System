import express from 'express';
import { addReview, updateReview, deleteReview } from '../controllers/review.controller.js';
import auth from '../middleware/auth.middleware.js';
const router = express.Router();
router.post('/books/:id/reviews', auth, addReview);
router.put('/reviews/:id', auth, updateReview);
router.delete('/reviews/:id', auth, deleteReview);
export default router;
