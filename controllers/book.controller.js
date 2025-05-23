import Book from '../models/book.model.js';
import Review from '../models/review.model.js';
export const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
export const getBooks = async (req, res) => {
  const { author, genre, page = 1, limit = 10 } = req.query;
  const query = {};
  if (author) query.author = new RegExp(author, 'i');
  if (genre) query.genre = genre;
  const books = await Book.find(query).skip((page - 1) * limit).limit(Number(limit));
  res.json(books);
};
export const getBookById = async (req, res) => {
  try {
    const { reviewPage = 1, reviewLimit = 5 } = req.query;
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const totalReviews = await Review.countDocuments({ book: book._id });
    const reviews = await Review.find({ book: book._id })
      .skip((reviewPage - 1) * reviewLimit)
      .limit(Number(reviewLimit));
    const avgRating = totalReviews > 0 ? (await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: null, avg: { $avg: "$rating" } } }
    ])).at(0)?.avg || 0 : 0;

    res.json({
      book,
      avgRating,
      reviews,
      reviewPagination: {
        totalReviews,
        reviewPage: Number(reviewPage),
        reviewLimit: Number(reviewLimit),
        totalPages: Math.ceil(totalReviews / reviewLimit)
      }
    });
  } catch (err) {
    res.status(404).json({ error: 'Book not found' });
  }
};
