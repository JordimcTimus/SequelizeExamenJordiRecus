import {Sequelize} from "sequelize";

export const crearConfigBDD = () => {
  return new Sequelize("unijordimunoz", "root", "kevin", {
    host: "localhost",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
}
