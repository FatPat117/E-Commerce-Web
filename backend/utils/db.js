import mongoose from "mongoose";

const connectDB = async () => {
        try {
                let con;
                if (process.env.MODE == "pro") {
                        con = await mongoose.connect(process.env.DB_PRO_URL, {
                                useNewUrlParser: true,
                                useUnifiedTopology: true,
                        });
                        console.log("Production database connect.");
                } else {
                        con = await mongoose.connect(process.env.DB_LOCAL_URL, {
                                useNewUrlParser: true,
                                useUnifiedTopology: true,
                        });
                        console.log("Local database connect.");
                }
                console.log(`MongoDB connected: ${con.connection.host}`);
        } catch (error) {
                console.log(error);
        }
};

export default connectDB;
