import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use([cors(), express.json()])
app.get('/', (req, res) => res.send('ok'))
app.listen(PORT, () => console.log(`app listening on port ${PORT}`))
