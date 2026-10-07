import "dotenv/config.js"
import app from "./src/app.js";

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
