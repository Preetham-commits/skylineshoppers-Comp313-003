import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'



dotenv.config()


connectDB()

const app = express()

app.use(express.json());

  app.get('/', (req, res) => {
    res.send('API is running....')
  })

  app.use('/api/users', userRoutes)  

const PORT = 3000

app.listen(
  PORT,
  console.log(
    `Server running on port ${PORT}`
  )
)
