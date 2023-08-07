import { Model, Sequelize } from 'sequelize'
import { dbConfig, Worksheet, Log } from '../models'

interface seqObject {
  [key: string]: Model | any | Sequelize // <any> | UserStatic | SkillsStatic | WorksheetStatic;
  sequelize: Sequelize
}

const seq: seqObject = {
  sequelize: dbConfig,
  Worksheet,
  Log,
}

seq.sequelize.sync({ force: false }).then(() => {
  console.log('Sequelize kras database & worksheet table ready.')
})

export { seq }
