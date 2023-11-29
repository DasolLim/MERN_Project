// Connect to MongoDB database using mongoose
const mongoose = require('mongoose')

// async operation used to connect to MongoDB database
const connectDB = async () => {
    try {
        // Establish connection
        // Connecting to mongoose using the MONGO_URI, located in .env file
        // "await" used to wait for the connectio to be established before moving onward
        const conn = await mongoose.connect(process.env.MONGO_URI)

        // Output for successful connection
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

// Export the connectDB function
module.exports = connectDB