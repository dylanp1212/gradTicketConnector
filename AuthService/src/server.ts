import dotenv from 'dotenv'
dotenv.config()

import app from './app'

const port = 3002

app.listen(port, () => {
  console.log(`AuthService listening on port ${port}`)
})
