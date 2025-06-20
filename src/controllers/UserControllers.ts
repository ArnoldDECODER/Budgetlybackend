import { Utils } from './../utils/Utils';
import { NodeMailer } from './../utils/NodeMailer';
import User from "../models/User";
import { validationResult } from 'express-validator';
import * as sgMail from '@sendgrid/mail';
import * as Bcrypt from 'bcrypt';
import { Jwt } from "./../utils/Jwt";
import { getEnvironmentVariables } from '../environments/environment';
export class UserController {

    //These function was moved to utils
    // private static encryptPassword(req, res, next) {
    //     return new Promise((resolve, reject) => {
    //         Bcrypt.hash(req.body.password, 10, (err, hash) => {
    //             if(err) {
    //                 reject(err);
    //             } else {
    //                 resolve(hash);
    //             }
    //         });
    //     });
    // }

    static async signup(req, res, next) {

        console.log(Utils.generateVerificationToken)

        const errors = validationResult(req);
        const name = req.body.name;
        const phone = req.body.phone; 
        const email = req.body.email;
        const password = req.body.password;
        const type = req.body.type;
        const status =req.body.status;
        const verification_token=Utils.generateVerificationToken();
        //const hash = await UserController.encryptPassword(req, res, next);

        //we don't need this part anymore since we're directly getting the errors from the router as middleware
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array().map(x => x.msg) });
        // }

        // if (!errors.isEmpty()) {
        //     next(new Error(errors.array()[0].msg));
        // }

        // const data = {
        //     email,
        //     //verification_token: verification_token,
        //     verification_token,
        //     verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME, //It will check if we entered the code within a specific time. MAX_TOKEN_TIME is coded under Utils. The tokken wil expire after the given time
        //     phone,
        //     password,
        //     name,
        //     type,
        //     status
        // };
        
        // let user = new User(data);
        
        // const user = new User({
        //     email,
        //     password
        // });

        // user.save().then(user => {
        //     res.send(user);
        // })
        // .catch(e => {
        //     next(e);
        // });

        //Another way of doing the save part
        try {
            const hash = await Utils.encryptPassword(password);
        
            const data = {
                email,
                verification_token,
                verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
                phone,
                password: hash,
                name,
                type,
                status
            };

            let user = await new User(data).save();
            const payload = {
                user_id: user._id,
                email: user.email
              };
              
              const token = Jwt.jwtSign(payload);
              
              res.json({
                token: token,
                user: user
              });
            // send email to user for verification
            await NodeMailer.sendMail({
                to: [user.email],
                subject: 'Verification OTP',//You can change the subject for the verification email here
                html: `<h1>Your Otp is ${verification_token}</h1>`
            });
            // sgMail.setApiKey(process.env.SENDGRID_API_KEY);

            // await sgMail.send({
            //     from: 'arnold.mabope@gmail.com',  // Replace with a verified sender email
            //     to: email,
            //     subject: 'OTP CODE WILL EXPIRE AFTER 5 MINUTES',  // You can change the subject for the verification email here
            //     html: `<h1>Your Otp is ${verification_token}</h1>`
            // });

            res.send(user);
        } catch(e) {
            next(e);
        }
    }

    static async verifyUserEmailToken(req, res, next) {
        const verification_token = req.body.verification_token;
        const email = req.user.email;
        try {
            const user = await User.findOneAndUpdate(
                {
                    email: email,
                    verification_token: verification_token,
                    verification_token_time: {$gt: Date.now()}
                },
                {
                    email_verified: true,
                    updated_at: new Date()
                },
                {
                    new: true
                }
            );
            if(user) {
                res.send(user);
            } else {
                throw new Error('Wrong OTP orEmail Verification Token Is Expired. Please try again...');
            }
        } catch(e) {
            next(e);
        }
    }

    //The best way so far to do define the login function
    // static login(req, res, next) {
    //     const data = [{name: 'technyks'}];
    //     res.status(200).send(data);
    //     const error = new Error('User email or password does not match'); //It initializes the error
    //     next(error);//It will trigger the error in the handleErrors function in server.ts
    // }

    //Another way to setup the login function and returning errors as 422 Unprocessable Entity which means the request was well-formed but had semantic errors.
    // static login(req, res) {
    //     const data = {name: 'technyks'};
    //     res.status(200).send(data);
    //     res.status(422).json({
    //         message: 'Email and password does not match',
    //         status_code: 422
    //     });
    // }

    //Another way to setup the login function and returning errors as 422 Unprocessable Entity which means the request was well-formed but had semantic errors.
    // static login(req, res, next) {
    //     // const data = [{name: 'technyks'}];
    //     // res.status(200).send(data);
    //     (req as any).errorStatus = 422;
    //     const error = new Error('User email or password does not match');
    //     next(error);
    // }


    //This one will allow us to return the key and value that are entered in postman using params under key you have to set the first key to email and 2nd key to password and give them the corresponding values. N.B this part is for testing
    // static login(req, res, next) {
    //     res.send(req.query);// change to req.body when using Post
    // }

    // change to req.body when using Post
    // static login(req, res, next) {
    //     res.send(req.body);// change to req.body when using Post
    // }


    static test1(req, res, next) {
        console.log('test');
        (req as any).msg = 'This is a test';
        next();
    }
    
    static test2(req, res) {
        res.send((req as any).msg);
    }

    // static login(req, res, next) {
    //     const email = req.body.email;
    //     const password = req.body.password;
    
    //     const user = new User({
    //         email,
    //         password
    //     });
    //     //This function is used to save data into mongoDB
    //     user.save().then((user) => {
    //         res.send(user);
    //     })
    //     .catch(e => {
    //         next(e);
    //     });
    //     //another way of doing the error but the top one is much better
    //     // .catch(e => {
    //     //     const err = new Error(e);
    //     //     next(err);
    //     // })
    // }

    //New login function
    static async login(req, res, next) {
        const user = req.user;
        const password = req.query.password;
        const data = {
            password,
            encrypt_password: user.password
        };
        try {
            await Utils.comparePassword(data);
            const payload = {
                user_id: user._id,
                email: user.email
            };
            const token = Jwt.jwtSign(payload);
            res.json({
                token: token,
                user: user
            });
        } catch(e) {
            next(e);
        }
    }
    //I moved the fuction to Utils so where we have const token i had to remove Usercontroller and add Utilis.
    // private static jwtSign(payload) {
    //     return Jwt.sign(
    //         payload,
    //         getEnvironmentVariables().jwt_secret_key,
    //         { expiresIn: '180d' }
    //     );
    // }
    // static test1(req, res, next) {
    //     console.log('test');
    //     (req as any).msg = 'This is a test';
    //     next();
    // }

    // static test2(req, res) {
    //     res.send((req as any).msg);

    // }

    static async resendVerificationEmail(req, res, next) {
        const email = req.user.email;
        const verification_token = Utils.generateVerificationToken();
        try {
            const user = await User.findOneAndUpdate(
                { email: email },
                {
                    updated_at: new Date(),
                    verification_token: verification_token,
                    verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME
                }
            );
            if (user) {
                res.json({ success: true });
                await NodeMailer.sendMail({
                    to: [user.email],
                    subject: "Resend Email Verification",
                    html: `<h1>Your OTP is ${verification_token}</h1>`
                });
                
            } else {
                throw new Error("User doesn't exist");
            }
        } catch (e) {
            next(e);
        }
    }

    static async sendResetPasswordOtp(req, res, next) {
        const email = req.query.email;
        const reset_password_token = Utils.generateVerificationToken();
        try {
            const user = await User.findOneAndUpdate(
                { email: email },
                {
                    updated_at: new Date(),
                    reset_password_token: reset_password_token,
                    reset_password_token_time: Date.now() + new Utils().MAX_TOKEN_TIME
                }
            );
            if (user) {
                res.json({ success: true });
                await NodeMailer.sendMail({
                    to: [user.email],
                    subject: 'Reset password email verification OTP',
                    html: `<h2>Your otp is ${reset_password_token}</h2>`
                });
                
            } else {
                throw new Error("User doesn't exist");
            }
        } catch (e) {
            next(e);
        }
    }

    static async verifyResetPasswordToken(req, res, next) {
        try {
          res.json({ success: true });
        } catch(e) {
          next(e);
        }
    }

    static async resetPassword(req, res, next) {
        const user = req.user;
        const new_password = req.body.new_password;
        try {
            const encryptedPassword = await Utils.encryptPassword(new_password);
            const updatedUser = await User.findByIdAndUpdate(
                user._id,
                {
                    updated_at: new Date(),
                    password: encryptedPassword
                },
                { new: true }
            );
            if(updatedUser) {
                res.send(updatedUser);
            } else {
                throw new Error('User doesn\'t exist');
            }
        } catch(e) {
            next(e);
        }
    }

    static async profile(req, res, next) {
        const user = req.user;
      
        try {
          const profile = await User.findById(user.aud);
          if(profile) {
            res.send(profile);
          } else {
            throw new Error('User doesn\'t exist');
          }
        } catch(e) {
          next(e);
        }
      }

    static async updatePhoneNumber(req, res, next) {
        const user = req.user;
        const phone = req.body.phone;
        try {
            const userData = await User.findByIdAndUpdate(
                user._id,
                { phone: phone ,updated_at: new Date()},
                { new: true },
            );
            res.send(userData);
        } catch(e) {
            next(e);
        }
    }

    static async updateUserProfile(req, res, next) {
        const user = req.user;
        const phone = req.body.phone;
        const new_email = req.body.email;
        const plain_password = req.body.password;
        const verification_token = Utils.generateVerificationToken();
    
        try {
            const userData = await User.findById(user._uid);
            if (!userData) throw new Error('User doesn\'t exist');
            
            await Utils.comparePassword({
                password: plain_password,
                encrypt_password: userData.password
            });
    
            const updatedUser = await User.findByIdAndUpdate(
                user.aud,
                {
                    phone: phone,
                    email: new_email,
                    email_verified: false,
                    verification_token,
                    verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
                    updated_at: new Date()
                },
                {new: true}

            );
              
              const payload = {
                aud: user.aud,
                email: updatedUser.email
              }
              
              const token = Jwt.jwtSign(payload);
              res.json({
                token: token,
                user: updatedUser
              });
              
              // send email to user for updated email verification
              NodeMailer.sendMail({
                to: [updatedUser.email],
                subject: 'Email Verification',
                html: '<h1>Your Otp is ${verification_token}</h1>'
              });
        } catch(e) {
            next(e);
        }
    }


} 