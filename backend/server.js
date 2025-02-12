import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'



dotenv.config()


connectDB()

const app = express()



  app.get('/', (req, res) => {
    res.send('API is running....')
  })


const PORT = 3000

app.listen(
  PORT,
  console.log(
    `Server running on port ${PORT}`
  )
)
