// import * as express from 'express';
// import * as mongoose from 'mongoose';
// let app: express.Application = express();
// import { getEnvironmentVariables } from './environments/environment';
import {Server} from './server';

let server = new Server().app
let port =3000; //it will allow us to change the port easily
server.listen(port, () => {
    console.log(`Server is running at port ${port}`);
}); 

// mongoose.connect('mongodb+srv://arnoldmabope:Arnold%401@cluster0.h6jgrer.mongodb.net/').then(() => {
//     console.log('Connected to mongodb.');
// }); 
// this part was moved to server.ts under mongodb function
// mongoose.connect(getEnvironmentVariables().db_uri)
//     .then(() => {
//         console.log('Connected to mongodb.');
//     });


