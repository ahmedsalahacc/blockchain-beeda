const express = require("express"),
  cors = require("cors"),
  { getNextGenDate, getAllTokens, getToken, getLastToken } = require("./utils");

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

app.get("/assets", async function (req, res) {
  // return the last token in the assets collection
  const data = await getLastToken();
  res.redirect("/assets/" + data);
});

app.listen(3500, function () {
  console.log("App Started");
});
