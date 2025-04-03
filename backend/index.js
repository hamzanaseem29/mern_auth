import express from 'express'
import 'dotenv/config'
import "./Models/db.js"
import bodyParser from 'body-parser'
import cors from 'cors'
import AuthRouter from "./Routes/AuthRouter.js"
import ProductRouter from "./Routes/ProductRouter.js"
const app = express()

const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
console.log('the backend is running') 
res.send('the backend is running')   
})

app.use(bodyParser.json())
app.use(cors())
app.use('/auth', AuthRouter)
app.use('/products', ProductRouter)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} `)
})