import pkg from 'pg'
import "dotenv/config"



const {Client} = pkg ;




const db = new Client ({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    password:process.env.DB_PASS,
    port:process.env.DB_PORT

})

db.connect()
.then (() => console.log('PostgresSQL Connect'))
.catch((error) => console.log("Connection Error",
error.stack))

export default db