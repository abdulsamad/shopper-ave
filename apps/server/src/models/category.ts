import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide category name'],
      trim: true,
      minlength: [2, 'Category name should be at least 2 characters'],
      maxlength: [40, 'Category name should be under 40 characters'],
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Category', CategorySchema);
