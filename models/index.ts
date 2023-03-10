import * as sequelize from 'sequelize'
import { WorksheetFactory } from './worksheet'
import _ from 'lodash'
import path from 'path'

// Default options
let seqOptions: sequelize.Options = {
  database: process.env.DB_NAME || 'typescript_test',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  dialectOptions: {
    decimalNumbers: true
  },
  define: {
    underscored: true
  }
}

// Load options from config.json if one is provided
const env = process.env.NODE_ENV || 'development'
try {
  const configOptions = require(path.resolve(__dirname, '..', 'config', 'config.json'))[env]
  seqOptions = _.merge(seqOptions, configOptions)
} catch (e) { console.error('No config.json provided for Sequelize') }

// Do NOT log your password on production!!!
if (env === 'development') { console.log('Initialising Sequelize with options:', seqOptions) }

// Initialise Sequelize
export const dbConfig: sequelize.Sequelize = new sequelize.Sequelize(seqOptions)

// Initialise models
export const Worksheet = WorksheetFactory(dbConfig)

