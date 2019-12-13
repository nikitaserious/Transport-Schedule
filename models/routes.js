const Sequelize = require('sequelize');
const config = require('./config.json');
const options = {
    host: config.host,
    dialect: config.dialect,
    logging: false,
    port: config.port,
};
// {
//   "host":"ec2-79-125-4-72.eu-west-1.compute.amazonaws.com",
//   "database":"d3m7sgq1ell2k2",
//   "login":"penmhnulwtgvbg",
//   "Port":5432,
//   "password":"35e8f9e17d0479d140a900d54b77efd4d8caf5e7b7fccf40ba0bdbeb9b048339",
//   "dialect": "postgres",
//   "define": {
//       "timestamps": true,
//       "paranoid": true
//   }
// }

const sequelize = new Sequelize(config.db, config.login, config.password, options);

     const Route=sequelize.define('Route', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Routeid: {
            type: Sequelize.INTEGER,allowNull: false
        },
        Routenum: {
            type: Sequelize.STRING,allowNull: false
        },
        Weekdays: {
            type: Sequelize.STRING,allowNull: false
        },        
        Routename: {
            type: Sequelize.STRING,allowNull: false
        },
        Routetype: {
            type: Sequelize.STRING,allowNull: false
        },
        Typeoftr: {
            type: Sequelize.STRING,allowNull: false
        }

    });
sequelize.sync().then(result=>{
  console.log('kek');
})
.catch(err=> console.log(err));
// Route.create({
//     Routeid: 12,
//     Routenum: 35,
//     Weekdays:"1234567",
//     Routename:"155"
//   }).then(res=>{
//     console.log(res);
//   }).catch(err=>console.log(err));

// Route.destroy(
//   ).then((res) => {
//   console.log(res);
// });
module.exports=Route;