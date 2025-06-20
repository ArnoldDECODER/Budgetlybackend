import Transaction from "../models/Transaction";
export class TransactionController {
    static async createTransaction(req, res, next) {
      try {
        const transaction = await new Transaction(req.body).save();
        return res.status(201).json({ message: 'Transaction created', transaction });
      } catch (error) {
        next(error);
      }
    }
  
    static async getTransactions(req, res, next) {
      try {
        const transactions = await Transaction.find({ user_id: req.user.user_id });
        return res.status(200).json(transactions);
      } catch (error) {
        next(error);
      }
    }
  
    static async updateTransaction(req, res, next) {
      try {
        const transaction = await Transaction.findOneAndUpdate(
          { _id: req.params.id, user_id: req.user.user_id },
          req.body,
          { new: true }
        );
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        return res.status(200).json({ message: 'Transaction updated', transaction });
      } catch (error) {
        next(error);
      }
    }
  
    static async deleteTransaction(req, res, next) {
      try {
        const transaction = await Transaction.findOneAndDelete({
          _id: req.params.id,
          user_id: req.user.user_id
        });
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        return res.status(200).json({ message: 'Transaction deleted' });
      } catch (error) {
        next(error);
      }
    }
  }