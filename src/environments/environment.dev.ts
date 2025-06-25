import { Environment } from "./environment";
import * as dotenv from 'dotenv';
dotenv.config();


export const DevEnvironment: Environment = {
    db_uri:process.env.DB_URI!,

    // gmail_auth: {
    //   user: '********',
    //   pass: '********',
    jwt_secret_key:process.env.JWT_SECRET_KEY!,
  };