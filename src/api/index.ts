import express, { Application } from 'express';
import compression from 'compression';

import routes from './routes';
import db from './models';
import { logger } from './middlewares/logger'
import { ENV } from '../config/config';

export function expressApp () {
    db.sequelize
        .authenticate()
        .then(() => {
            logger.info('connected to db');
            return null;
        })
        .catch(() => {
            throw new Error('error');
        });

    const app: Application = express();
    if (ENV === 'production') {
        // app.use(helmet());
        app.use(compression());
    }
    
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // app.use(timeMiddleware);
    // app.use('/v1', routes(db));
    app.use('/v1', routes(db));

    return app;
}
