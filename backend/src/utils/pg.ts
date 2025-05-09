import postgres from 'postgres'
import config from '../config/config'

const connectionString = config.databaseURL

const sql = postgres(connectionString)

export default sql