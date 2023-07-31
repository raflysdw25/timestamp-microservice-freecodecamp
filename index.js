// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
// app.get("/api/hello", function (req, res) {
//   res.json({ greeting: "hello API" });
// });
app.get("/api/", function (req, res) {
  let responseDate = new Date();

  res.json({
    unix: responseDate.getTime(),
    utc: responseDate.toUTCString(),
  });
});
app.get("/api/:date", function (req, res) {
  const isMilliSeconds = (value) => {
    return (
      typeof Number(value) === "number" && !isNaN(value) && Number(value) > 0
    );
  };

  const isDateString = (value) => {
    return typeof value === "string" && !isNaN(Date.parse(value));
  };

  if (isMilliSeconds(req.params.date)) {
    const responseDate = new Date(Number(req.params.date));
    res.json({
      unix: responseDate.getTime(),
      utc: responseDate.toUTCString(),
    });
    return;
  }
  if (isDateString(req.params.date)) {
    const responseDate = new Date(req.params.date);
    res.json({
      unix: responseDate.getTime(),
      utc: responseDate.toUTCString(),
    });
    return;
  }
  res.json({ error: "Invalid Date" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
