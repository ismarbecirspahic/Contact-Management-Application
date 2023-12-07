const client = require("./database");
const express = require("express");
const bodyParser = require("body-parser");
const PORT = 3300;

const app = express();

const contactsRoute = require("./routes/contactRoutes");
app.use(bodyParser.json());

app.use("/contacts", contactsRoute);

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
client.connect();
