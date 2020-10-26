'use strict';

import { Sequelize } from "sequelize/types";

// import { Sequelize, Model, DataTypes, Optional } from "sequelize";


module.exports = function (sequelize :Sequelize, DataTypes) {
  const Worksheet = sequelize.define('Worksheet', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    doctor: DataTypes.STRING,
    hash: DataTypes.STRING,
    data: DataTypes.TEXT
  }, {});
//   Worksheet.associate = function(models) {
//     // associations can be defined here
//   };
  return Worksheet;
};


// export { Worksheet }

// import { Sequelize, Model, DataTypes, Optional } from "sequelize";

// interface UserAttributes {
//     id: number;
//     name: string;
//   }
  
//   // Some fields are optional when calling UserModel.create() or UserModel.build()
//   interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}
  
// interface UserInstance
//   extends Model<UserAttributes, UserCreationAttributes>,
//     UserAttributes {}

// const UserModel = sequelize.define<UserInstance>("User", {
//     id: {
//       primaryKey: true,
//       type: DataTypes.INTEGER.UNSIGNED,
//     },
//     name: {
//       type: DataTypes.STRING,
//     },
//   });

  

