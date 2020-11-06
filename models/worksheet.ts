import { DataTypes, Sequelize } from 'sequelize'
import { WorksheetStatic } from './models'

export function WorksheetFactory (sequelize: Sequelize): WorksheetStatic {
  return <WorksheetStatic>sequelize.define('Worksheet', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    doctor: DataTypes.STRING,
    hash: DataTypes.STRING,
    data: DataTypes.JSON
  })
}
