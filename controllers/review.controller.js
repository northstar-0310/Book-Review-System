import Review from '../models/review.model.js';
export const addReview = async (req, res) => {
  try {
    const existing = await Review.findOne({ book: req.params.id, user: req.user.id });
    if (existing) return res.status(400).json({ error: 'You have already reviewed this book' });
    const review = await Review.create({ ...req.body, user: req.user.id, book: req.params.id });
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review.user.toString() !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });
    Object.assign(review, req.body);
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review.user.toString() !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });
    await review.deleteOne();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
