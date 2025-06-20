import { Router } from 'express';
import { TransactionController } from '../controllers/TransactionController';
import { TransactionValidators } from '../Validators/TransactionValidators';
import { GlobalMiddleware } from '../middlewares/GlobalMiddleWare';

class TransactionRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }

  getRoutes() {
    this.router.get('/', GlobalMiddleware.auth, TransactionController.getTransactions);
  }

  postRoutes() {
    this.router.post(
      '/',
      GlobalMiddleware.auth,
      TransactionValidators.create(),
      GlobalMiddleware.checkError,
      TransactionController.createTransaction
    );
  }

  putRoutes() {
    this.router.put(
      '/:id',
      GlobalMiddleware.auth,
      TransactionValidators.update(),
      GlobalMiddleware.checkError,
      TransactionController.updateTransaction
    );
  }

  deleteRoutes() {
    this.router.delete(
      '/:id',
      GlobalMiddleware.auth,
      TransactionValidators.delete(),
      GlobalMiddleware.checkError,
      TransactionController.deleteTransaction
    );
  }
}

export default new TransactionRouter().router;