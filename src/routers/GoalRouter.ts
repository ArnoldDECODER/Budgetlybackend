import { Router } from 'express';
import { GoalController } from '../controllers/GoalController';
import { GoalValidators } from '../Validators/GoalValidators';
import { GlobalMiddleware } from '../middlewares/GlobalMiddleWare';

class GoalRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }

  getRoutes() {
    this.router.get('/', GlobalMiddleware.auth, GoalController.getGoals);
  }

  postRoutes() {
    this.router.post(
      '/',
      GlobalMiddleware.auth,
      GoalValidators.create(),
      GlobalMiddleware.checkError,
      GoalController.createGoal
    );
  }

  putRoutes() {
    this.router.put(
      '/:id',
      GlobalMiddleware.auth,
      GoalValidators.update(),
      GlobalMiddleware.checkError,
      GoalController.updateGoal
    );
  }

  deleteRoutes() {
    this.router.delete(
      '/:id',
      GlobalMiddleware.auth,
      GoalValidators.delete(),
      GlobalMiddleware.checkError,
      GoalController.deleteGoal
    );
  }
}

export default new GoalRouter().router;