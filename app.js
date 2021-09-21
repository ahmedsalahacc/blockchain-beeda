var express = require("express");
var { getDate, getAllTokens } = require("./utils");
var app = express();

app.get("/time", async function (req, res) {
  // return the time to next generation
  let time_ng = await getDate();

  res.json({
    time: time_ng,
  });
});

app.get("/assets/all", async function (req, res) {
  // return the time to next generation
  let data = await getAllTokens();
  res.json(data);
});

// functions handling

app.listen(3500, function () {
  console.log("App Started");
});
