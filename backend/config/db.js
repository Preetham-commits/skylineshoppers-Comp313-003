//Preetham Karra 301329279
// Importing necessary configurations for the database
import config from './config.js';

// Importing mongoose for MongoDB object modeling
import mongoose from 'mongoose';

const connectDB = async () => {
    // Connecting to MongoDB using the connection string from the config
    mongoose.connect('mongodb+srv://27navdeep2000:Sahota100$@cluster0.n0siw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

    // Creating a connection instance
    let mongodb = mongoose.connection;
  
    // Handling connection errors
    mongodb.on('error', console.error.bind(console, 'Connection Error: '));
  
    // Logging successful database connection
    mongodb.once('open', () => {
        console.log("====> Connected to MongoDB.");
})
}



export default connectDB
