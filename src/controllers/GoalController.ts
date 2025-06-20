import Goal from "../models/Goal";

export class GoalController {
    static async createGoal(req, res, next) {
      try {
        const goal = await new Goal({ ...req.body, user_id: req.user.user_id }).save();
        return res.status(201).json({ message: 'Goal created', goal });
      } catch (error) {
        next(error);
      }
    }
  
    static async getGoals(req, res, next) {
      try {
        const goals = await Goal.find({ user_id: req.user.user_id });
        return res.status(200).json(goals);
      } catch (error) {
        next(error);
      }
    }
  
    static async updateGoal(req, res, next) {
      try {
        const goal = await Goal.findOneAndUpdate(
          { _id: req.params.id, user_id: req.user.user_id },
          req.body,
          { new: true }
        );
        if (!goal) return res.status(404).json({ message: 'Goal not found' });
        return res.status(200).json({ message: 'Goal updated', goal });
      } catch (error) {
        next(error);
      }
    }
  
    static async deleteGoal(req, res, next) {
      try {
        const goal = await Goal.findOneAndDelete({
          _id: req.params.id,
          user_id: req.user.user_id
        });
        if (!goal) return res.status(404).json({ message: 'Goal not found' });
        return res.status(200).json({ message: 'Goal deleted' });
      } catch (error) {
        next(error);
      }
    }
  }