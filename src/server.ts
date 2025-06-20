import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { getEnvironmentVariables } from './environments/environment';
import UserRouter from './routers/UserRouter';
import AuthRouter from './routers/AuthRouter';
import TransactionRouter from './routers/TransactionRouter';
import GoalRouter from './routers/GoalRouter';
import CategoryRouter from './routers/CategoryRouter';
import * as dotenv from 'dotenv';
dotenv.config();

export class Server {

    public app: express.Application = express();

    constructor() {
        this.setConfigs();
        this.setRoutes();
        this.error404Handler(); //always call it after setting routes or else it will return errors even for defined routes. Since we have handleErrors it will now be skipped
        this.handleErrors();
    }

    setConfigs() {
        this.connectMongoDB();
        this.configureBodyParser();
        this.allowCors();//it will allow backend data to be accessed from different servers
    }

    connectMongoDB() {
        mongoose.connect(getEnvironmentVariables().db_uri)
        .then(() => {
            console.log('Connected to mongodb.');
        });
    }
    
    setRoutes() {
        this.app.use('/api/user', UserRouter);
        this.app.use('/api/auth', AuthRouter);
        this.app.use('/api/transactions', TransactionRouter);
        this.app.use('/api/goals', GoalRouter);
        this.app.use('/api/categories', CategoryRouter);
    }
    //The error404Handler function is used to handle errors
    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: 'Not found',
                status_code: 404
            });
        });
    }


    //This function handles errors dynamically
    handleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || 'Something went wrong',
                status_code: errorStatus
            });
        });
    }

    configureBodyParser() {
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        //this.app.use(bodyParser.json()); // is another way of collecting data just finfout how to use both methods with http
    }

    allowCors(){
        this.app.use(cors());
    }
    // userRoutes() {
    //     this.app.use('/api/user', UserRouter);
      
    //   }
}