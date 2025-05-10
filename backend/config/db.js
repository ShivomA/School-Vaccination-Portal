const mongoose = require("mongoose");

// MongoDB Connection
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
  retryWrites: true, // Enable retryWrites
  w: "majority", // Set write concern to majority
  appName: "vaccination-portal", // Set the application name for logging/monitoring
};

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGODB_URI, clientOptions)
    .then(async () => {
      console.log("MongoDB Connected");

      await mongoose.connection.db.admin().command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    })
    .catch((err) => console.log(err));
};

module.exports = connectDB;
