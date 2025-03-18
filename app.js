import express from 'express'
import dotenv from 'dotenv'
import conectDB from './db/connect.js'
import notFound from './middleware/not_found.js'
import error_handler from './middleware/error_handler.js'
import auth from './middleware/authmiddleware.js'
import cors from 'cors'
 dotenv.config()

//  router
import authRouter from './route/auth.js'
import jobRouter from './route/job.js'

const app = express()
// middleware
app.use(express.json())
app.use(cors())

app.get('/', (req ,res) => {
    res.status(200).json({msg : "Jobs API"})

})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs' ,auth , jobRouter)
app.use(notFound)
app.use(error_handler)


const Port = process.env.Port || 4000
const start = async() => {
    try{
        await  conectDB()
        console.log('database connection successfull')
        app.listen(Port , () => {
            console.log(`server is listening at port ${Port}.....`)
        })
    }catch(error){
      console.log(error)
    }
}

start()
