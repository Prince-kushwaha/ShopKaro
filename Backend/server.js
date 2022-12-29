const dotenv = require("dotenv");
const cloundinary = require("cloudinary");
dotenv.config({ path: "Backend/.env" });
const app = require("./app");

process.on("uncaughtException", (err) => {
  console.log(`Error : ${err}`);
  console.log("shutdown the server due to unhandle uncaughtException");
  process.exit(1);
});

cloundinary.config({
  cloud_name: process.env.CLOUDINARYNAME,
  api_key: process.env.CLOUDINARYAPI,
  api_secret: process.env.CLOUDINARYSECRETKEY,
});

const connectDataBase = require("./db/connection");

// connect to database
connectDataBase();
const port = process.env.PORT;
const server = app.listen(port, function () {
  console.log(`Server is Working on the Port :${port}`);
});

// unhandledRejection
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err}`);
  console.log("shutdown the server due to unhandle promise rejection");
  server.close(() => {
    console.log("Server is closed");
    process.exit(1);
  });
});
