const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const contactsRoute = require("./routes/contactRoutes");
app.use("/contacts", contactsRoute);

const categoryRoute = require("./routes/categoryRoutes");
app.use("/categories", categoryRoute);

(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database synchronized.");
    app.listen(PORT, () => {
      console.log(`Server is listening at port ${PORT}`);
    });
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
})();
