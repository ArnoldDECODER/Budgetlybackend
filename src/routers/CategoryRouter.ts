import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';
import { CategoryValidators } from '../Validators/CategoryValidators';
import { GlobalMiddleware } from '../middlewares/GlobalMiddleWare';

class CategoryRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.deleteRoutes();
  }

  getRoutes() {
    this.router.get('/', GlobalMiddleware.auth, CategoryController.getCategories);
  }

  postRoutes() {
    this.router.post(
      '/',
      GlobalMiddleware.auth,
      CategoryValidators.create(),
      GlobalMiddleware.checkError,
      CategoryController.createCategory
    );
  }

  deleteRoutes() {
    this.router.delete(
      '/:id',
      GlobalMiddleware.auth,
      CategoryValidators.delete(),
      GlobalMiddleware.checkError,
      CategoryController.deleteCategory
    );
  }
}

export default new CategoryRouter().router;