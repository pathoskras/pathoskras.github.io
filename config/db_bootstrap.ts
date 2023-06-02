import { Model, Sequelize } from 'sequelize'
import { dbConfig, Worksheet } from '../models'

interface seqObject {
    [key: string] : Model | any | Sequelize; // <any> | UserStatic | SkillsStatic | WorksheetStatic;
    sequelize :Sequelize;
}

const seq :seqObject = {
  sequelize: dbConfig,
  Worksheet: Worksheet
}

seq.sequelize.sync({ force: false })
.then(() => {
  console.log('Database & tables created!')
})

export { seq }
