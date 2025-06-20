import Category from "../models/Category";
export class CategoryController {
    static async createCategory(req, res, next) {
      try {
        const category = await new Category({
          ...req.body,
          user_id: req.user.user_id
        }).save();
        return res.status(201).json({ message: 'Category created', category });
      } catch (error) {
        next(error);
      }
    }
  
    static async getCategories(req, res, next) {
      try {
        const categories = await Category.find({ user_id: req.user.user_id });
        return res.status(200).json(categories);
      } catch (error) {
        next(error);
      }
    }
  
    static async deleteCategory(req, res, next) {
      try {
        const category = await Category.findOneAndDelete({
          _id: req.params.id,
          user_id: req.user.user_id
        });
        if (!category) return res.status(404).json({ message: 'Category not found' });
        return res.status(200).json({ message: 'Category deleted' });
      } catch (error) {
        next(error);
      }
    }
  }