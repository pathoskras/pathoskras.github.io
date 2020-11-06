import { DataTypes, Sequelize } from 'sequelize'
import { UserStatic } from './models'

export function UserFactory (sequelize: Sequelize): UserStatic {
  return <UserStatic>sequelize.define('users', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
}
