import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const mongodbConnectUrl: string =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_CLOUD_PROD!
    : process.env.MONGODB_CLOUD_TEST!

/**
 * Global is used here to maintain a cached connection across hot reloads in
 * development. This prevents connections growing exponentially during API
 * Route usage.
 */
let globalWithMongoose = global as typeof globalThis & { mongoose: any }
let cached = globalWithMongoose.mongoose

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null }
}

const getMongodbInstance = async () => {
  if (cached.conn) {
    return cached.conn
  }
  if (!cached.promise) {
    const options = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    cached.promise = mongoose
      .connect(mongodbConnectUrl, options)
      .then((mongoose) => {
        console.log(`Connect to mongodb of ${process.env.NODE_ENV} db`)
        return mongoose
      })
      .catch((error) => {
        console.log(`Failed to connect to mongodb due to ${error}`)
      })
  }
  cached.conn = await cached.promise

  return cached.conn
}

export default getMongodbInstance
