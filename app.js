const express = require("express"),
  cors = require("cors"),
  { getNextGenDate, getAllTokens, getToken } = require("./utils");

/*--global variables--*/
const app = express();
app.use(cors());

/*--server routes--*/
app.get("/nextgen/date", async function (req, res) {
  // return the time to next generation
  let time_ng = await getNextGenDate();

  res.json({
    time: time_ng,
  });
});

app.get("/assets/all", async function (req, res) {
  // return the time to next generation
  let data = await getAllTokens();
  res.json(data);
});

app.get("/assets/:id", async function (req, res) {
  // return the time to next generation
  let id = req.params.id;
  let data = await getToken(id);
  res.json(data);
});

// functions handling

app.listen(3500, function () {
  console.log("App Started");
});
