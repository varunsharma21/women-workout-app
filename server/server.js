const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log("DB connected successfully!"))
  .catch((err) => console.log("Error hai: ", err));

const port = process.env.PORT || 5500;

app.listen(port, () => console.log(`Listening to port ${port}`));
