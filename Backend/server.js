import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

/* load enviroment variable */
dotenv.config()

const app = express()
const PORT = 4000

///MiddleWare setUp
app.use(cors({
    origin: "http://localhost:3000",
    methods:["GET",'POST',"PUT","DELETE","PATCH"],
    allowedHeaders:["Content-type", "Authorization"],
    Credentials:true
}))

app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server is running on well ${PORT}`)
})