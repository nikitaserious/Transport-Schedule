module.exports = (Sequelize, sequelize) => {
    return sequelize.define('Route', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Routeid: {
            type: Sequelize.INTEGER,allowNull: false
        },
        Routenum: {
            type: Sequelize.INTEGER,allowNull: false
        },
        Weekdays: {
            type: Sequelize.STRING,allowNull: false
        },        
        Routename: {
            type: Sequelize.STRING,allowNull: false
        },
    });
};
sequelize.sync().then(result=>{
  console.log(result);
})
.catch(err=> console.log(err));