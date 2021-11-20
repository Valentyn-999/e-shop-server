require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const router = require("./routes/index")
const errorHandler = require("./middleware/ErrorHanding")

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors())
app.use(express.json())
app.use(fileUpload)
app.use("/api", router)
app.use(errorHandler) // middleware that works with errors has to be at the end of the "use list"

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`this is my server, port: ${PORT}`))
    } catch (err) {
        console.log(err)
    }
}

start()


