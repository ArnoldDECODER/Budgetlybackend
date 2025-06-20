import { GlobalMiddleware } from '../middlewares/GlobalMiddleWare';
import { UserValidators } from './../Validators/UserValidators';
import { UserController } from './../controllers/UserControllers';
import { Router } from 'express';
import { body,validationResult } from 'express-validator';


class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.putRoutes();
        this.deleteRoutes();
    }

    getRoutes() {
        //this.router.post('/signup',UserController.signup);
        // this.router.post('/signup', UserValidators.signup(), UserController.login);
        // on uservalidators we are calling a function that's why we have () on usercontroller we are passing a function like passing the function to someone else so we don't need ()
        //Recheck the resend otp function for the following line of code
        //this.router.post('/signup', UserValidators.signup(), UserController.signup);
        //This is another way to setup the signup function with validation but it is not recommended since you will have to do the same thing for each function routes
        // this.router.post(
        //     '/signup',
        //     [
        //       body('name', 'Name is required').isString(),
        //       body('email', 'Email is required').isEmail(),
        //       body('password', 'Password is required').isLength({ min: 5 })
        //       .custom((req) => {
        //         if(req.email) return true;
        //         else {
        //           throw new Error('Email is not available for validation');
        //         }
        //       }),
        //     ],
        //     UserController.signup
        //   );
        // this.router.get('/test', UserController.login, UserController.test1, UserController.test2); 
        //this.router.post('/login', UserController.login); //Change it to this.router.post when using post
        this.router.get('/send/verification/email',GlobalMiddleware.auth, UserController.resendVerificationEmail);
        this.router.get('/login', UserValidators.login(),GlobalMiddleware.checkError, UserController.login);
        this.router.get('/test', UserController.test1,UserController.test2);
        this.router.get('/send/reset/password/token',UserValidators.checkResetPasswordEmail(), GlobalMiddleware.checkError, UserController.sendResetPasswordOtp);
        this.router.get('/verify/resetPasswordToken', UserValidators.verifyResetPasswordToken(),GlobalMiddleware.checkError, UserController.verifyResetPasswordToken);
        this.router.get("/profile", GlobalMiddleware.auth, UserController.profile);

    } 

    postRoutes() {
        this.router.post('/signup', UserValidators.signup(),GlobalMiddleware.checkError, UserController.signup);
    }
    patchRoutes() {
        this.router.patch('/verify/emailToken', UserValidators.verifyUserEmailToken(),GlobalMiddleware.checkError,GlobalMiddleware.auth, UserController.verifyUserEmailToken);
        this.router.patch('/update/phone', UserValidators.verifyPhoneNumber(),GlobalMiddleware.checkError,GlobalMiddleware.auth, UserController.updatePhoneNumber);
        this.router.patch('/update/profile', UserValidators.verifyUserProfile(),GlobalMiddleware.checkError,GlobalMiddleware.auth, UserController.updateUserProfile);
        this.router.patch('/reset/password', UserValidators.resetPassword(),GlobalMiddleware.checkError, UserController.resetPassword);
    }

    putRoutes() {}

    deleteRoutes() {}
}

export default new UserRouter().router;