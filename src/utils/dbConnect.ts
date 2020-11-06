import mongoose from 'mongoose'
import { RouteHandler } from '@/src/middlewares/apiRoutesHandler'
import { MONGO_URL } from '@/config'

const connection: { isConnected: boolean } = {
  isConnected: false,
}

const connectDb = async () => {
  if (connection.isConnected) {
    return
  }
  try {
    const dbConnection = await mongoose.connect(MONGO_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    connection.isConnected = !!dbConnection.connections[0].readyState
  } catch (err) {
    console.error(`error connecting to db ${err.message || err}`)
  }
}

function withDb(handler: RouteHandler | any) {
  connectDb()
  return handler
}

export function withDbMiddleware(req: any, res: any, next: any) {
  connectDb()
  next()
}

export default withDb
