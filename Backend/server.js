import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import db from '../Backend/utils/db.js'
import productCategoryRouter from '../Backend/Routes/ProductCategory/categoryRoutes.js'
import productRouter from '../Backend/Routes/ProductCategory/ProductRoutes.js'
import productItemRouter from "../Backend/Routes/ProductCategory/ProductItem.js"


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

app.use('/api/ProductCategory',productCategoryRouter)
app.use("/api/product",productRouter)
app.use('/api/productItem',productItemRouter)

app.listen(PORT, () => {

    console.log(`Server is running  ${PORT}`)

    

})