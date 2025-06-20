import * as Bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken";
import { getEnvironmentVariables } from "../environments/environment";

export class Utils {
  public MAX_TOKEN_TIME = (5 * 60 * 1000);// 5 for 5 minutes 60 to multipy 1000 milliseconds with 60 to have 1 minute
  static generateVerificationToken(digit: number = 6) {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < digit; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    //return parseInt(otp); // if token is 01234 it will return it as 1234 so it's better to return it as a string
    return otp;
  }

  static encryptPassword(password) {
    return new Promise((resolve, reject) => {
        Bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
}

static comparePassword(data: { password: string, encrypt_password: string }):Promise<any>{
  return new Promise((resolve, reject) => {
      Bcrypt.compare(data.password, data.encrypt_password, (err, same) => {
          if (err) {
              reject(err);
          } else if (!same) {
              reject(new Error("User & Password Doesn't Match"));
          } else {
              resolve(true);
          }
      });
  });
}


// another way to do the above code and be able to change it dynamically but still needs to be fixed
// static jwtSign(payload, expires_in: string = '180d') {
//   return jwt.sign(
//       payload,
//       getEnvironmentVariables().jwt_secret_key,
//       { expiresIn: expires_in }
//   );
// }
}