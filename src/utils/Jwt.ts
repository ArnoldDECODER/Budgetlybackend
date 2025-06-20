import * as Bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { getEnvironmentVariables } from '../environments/environment';

export class Jwt {
    // static jwtSign(payload, expires_in: string = '180m') {
    //     return jwt.sign(
    //         payload,
    //         getEnvironmentVariables().jwt_secret_key,
    //         {
    //             expiresIn: expires_in
    //         }
    //     );
    // }
    static jwtSign(payload) {
        return jwt.sign(
            payload,
            getEnvironmentVariables().jwt_secret_key,
            { expiresIn: '180d' }
        );
      }
    
    //find out how to use the code below for future projects
    // static jwtSign(payload, expires_in: string = '1800') {
    //     return jwt.sign(
    //         payload,
    //         getEnvironmentVariables().jwt_secret_key,
    //         { expiresIn: expires_in, issuer: 'techphys.com' }
    //     );
    // }
    static jwtVerify(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, getEnvironmentVariables().jwt_secret_key, (err, decoded) => {
                if (err) reject(err);
                else if (!decoded) reject(new Error('User is not authorised.'));
                else resolve(decoded);
            });
        });
    }
}