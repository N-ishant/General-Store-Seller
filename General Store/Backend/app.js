const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./util/database");

const app = express();

app.use(cors());

const itemRoutes = require("./routes/items");

app.use(bodyParser.json({ extended: false }));

app.use(itemRoutes);

sequelize
  .sync()
  .then((result) => {
    app.listen(3000, () => {
      console.log("Serer started at port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

/*
Cross-origin resource sharing (CORS) is a mechanism for integrating applications. CORS defines a way for client
web applications that are loaded in one domain to interact with resources in a different domain. This is useful
because complex applications often reference third-party APIs and resources in their client-side code. For 
example, your application may use your browser to pull videos from a video platform API, use fonts from a 
public font library, or display weather data from a national weather database. CORS allows the client browser 
to check with the third-party servers if the request is authorized before any data transfers.
*/