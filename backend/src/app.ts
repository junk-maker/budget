import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import compression from 'compression';
import express, {Application} from 'express';
import errorMiddleware from './middleware/error.middleware';
import Controller from '@/utils/interfaces/controller.interface';

class App {
    public red: string;
    public port: number;
    public blue: string;
    public yellow: string;
    public express: Application;

    constructor(controllers: Controller[], port: number) {
        this.port = port;
        this.express = express();
        this.red = '\x1b[31m%s\x1b[0m';
        this.blue = '\x1b[34m%s\x1b[0m';
        this.yellow = '\x1b[33m%s\x1b[0m';

        this.middleware();
        this.databaseConnection();
        this.controllers(controllers);
    };

    private middleware(): void {
        this.express.use(cors());
        this.express.use(helmet());
        this.express.use(compression());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended: false}));
    };

    private controllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    };

    private errorHandling(): void {
        this.express.use(errorMiddleware);
    };

    private databaseConnection(): void {
        mongoose.connect(`${process.env.MONGO_URI}`)
        .then(() => console.log(this.yellow,'MongoDB connection SUCCESS!'))
        .catch(err => console.log(this.red,`MongoDB connection FAIL: ${err}`));
    };

    public listen(): void {
        this.errorHandling();
        this.express.listen(this.port, () => {
            console.log(this.blue, `Server has been started on port ${this.port}!`);
        });
    };
};

export default App;