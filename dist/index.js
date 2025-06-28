import app from "./app.js";
import { connectToDatabase } from "./db/connectDB.js";
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Your server is initialized and running sir!");
});
connectToDatabase();
