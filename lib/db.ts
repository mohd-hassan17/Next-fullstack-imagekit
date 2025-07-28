
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
    throw new Error("Please define mongodb_uri in env variables")
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export async function dbConnection() {
    if (cached.conn) {
        console.log("✅ Using cached DB connection");
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10,
        };
        cached.promise = mongoose.connect(MONGODB_URI, opts).then(() => {
      console.log("✅ MongoDB connected");
      return mongoose.connection;
    });
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        cached.promise = null;
        throw error
    }
    return cached.conn;
}