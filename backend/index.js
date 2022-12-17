require("dotenv").config();
const app = require("./app");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");
// handling uncaught error
process.on("unCaughtException", (err) => {
    console.log(`Error message : ${err.message}`);
    console.log("Shutting down server due to uncaught exception");
    process.exit(1);
});

const PORT = process.env.PORT || 4000;
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

// unhandle promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error Message:${err.message}`);
    console.log(`Shutting Down Server due to unhandle promise rejection`);
    server.close(() => {
        process.exit(1);
    });
});