import app from "./app.js";
import { connectDB } from "./config/db.config.js";

const PORT = 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
