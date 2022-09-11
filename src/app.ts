import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import { authRouter, credentialRouter } from './routes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use([cors(), express.json(), authRouter, credentialRouter])
app.listen(PORT, () => console.log(`app listening on port ${PORT}`))
