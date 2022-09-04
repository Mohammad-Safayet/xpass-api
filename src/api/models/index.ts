/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-dynamic-require */

import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';

import { ENV } from '../../config/config';

const env = ENV;
const basename = path.basename(__filename);
const config = require(`${__dirname}/../../config/database.js`)[env];
const db: any = {};

let sequelize: any;

if (config.use_env_variable) {
  const envVar = process.env[config.use_env_variable];
  if (envVar !== undefined) {
    sequelize = new Sequelize(envVar, config);
  }
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file: string) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      (file.slice(-3) === '.js' || '.ts')
    );
  })
  .forEach((file: any) => {
    // eslint-disable-next-line global-require
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
