import mongoose from "mongoose";

const connectDB = async () => {
        try {
                const conn = await mongoose.connect(process.env.DB_URL, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                });
                console.log(`MongoDB connected: ${conn.connection.host}`);
        } catch (error) {
                console.log(error);
        }
};

export default connectDB;
