import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { Utils } from '../utils/Utils';
import { NodeMailer } from '../utils/NodeMailer';
import { Jwt } from '../utils/Jwt';
import User from '../models/User';


interface AuthenticatedRequest extends Request {
    user: any; // Replace `any` with a proper User type later
  }
  

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const { name, phone, email, password, type, status } = req.body;
    const verification_token = Utils.generateVerificationToken();

    try {
      const hash = await Utils.encryptPassword(password);
      const user = await new User({
        email,
        phone,
        password: hash,
        name,
        type,
        status,
        verification_token,
        verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME
      }).save();

      const payload = { user_id: user._id, email: user.email };
      const token = Jwt.jwtSign(payload);

      await NodeMailer.sendMail({
        to: [user.email],
        subject: 'Verification OTP',
        html: `<h1>Your Otp is ${verification_token}</h1>`
      });

      return res.status(201).json({ token, user });
    } catch (err) {
      next(err);
    }
  }

  static async login(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const user = req.user;
    const password = req.query.password as string;

    try {
      await Utils.comparePassword({
        password,
        encrypt_password: user.password
      });

      const payload = { user_id: user._id, email: user.email };
      const token = Jwt.jwtSign(payload);

      return res.json({ token, user });
    } catch (err) {
      next(err);
    }
  }

  static async logout(_: Request, res: Response) {
    // Typically handled on client by removing token
    res.status(200).json({ message: 'Logged out successfully' });
  }

  static async getCurrentUser(req: AuthenticatedRequest, res: Response) {
    try {
      const user = await User.findById(req.user.user_id).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) {
      return res.status(500).json({ message: 'Error fetching user' });
    }
  }
}