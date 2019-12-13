module.exports = async function (db) {
    console.log(db.sequelize.sync);
    await db.sequelize.sync({force: true});
  console.log(1);
    await db.user.bulkCreate([
        {
            email: "kek@mail.ru",
            password: "$2a$05$ELQfhLYBq.XuQk1PN6tS4.GhW7CIZ1mRn0Vf9vjb.1R1a1Ax0xeiK",
            codes: "[12345,54321,44444,21543]"
        }
    ]);
  };
//password - admin
//bcrypt iteration's number - 5
//$2a$05$ELQfhLYBq.XuQk1PN6tS4.GhW7CIZ1mRn0Vf9vjb.1R1a1Ax0xeiK