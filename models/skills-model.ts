import { DataTypes, Sequelize } from 'sequelize'
import { SkillsStatic } from './models'

export function SkillsFactory (sequelize: Sequelize): SkillsStatic {
  return <SkillsStatic>sequelize.define('skills', {
    skill: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
}
