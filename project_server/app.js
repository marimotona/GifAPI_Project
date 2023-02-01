// Express Server インスタンスを作成
require("dotenv").config({ debug: true });
let express = require("express");
let app = express();
var path = require("path");
const { send } = require("process");
var PORT = 3000;

if (typeof process.env.API_KEY === "undefined") {
  console.error('Error: "KEY1" is not set.');
  console.error("Please consider adding a .env file with KEY1.");
  process.exit(1);
}

//index.jsでfetchしてリクエストが送られたのが分かるのは、ここでapp.useしているから？
app.use("/static/", express.static(path.join(__dirname, "static/views")));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

async function search(word, num) {
  console.log("search");
  const API_KEY = process.env.API_KEY;

  const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${word}&limit=${num}&offset=0&rating=g&lang=en`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    //console.log(data);
    //console.log(typeof data);
    const gifUrls = data.data.map(item => item.images.fixed_height.url);
    //console.log(typeof gifUrls);
    return gifUrls;
  } catch (error) {
    console.log(error);
  }
}

app.get("/", function(req, res, next) {
  var options = {
    root: path.join(__dirname)
  };

  var fileName = path.join(__dirname, "static/views/index.html");
  res.sendFile(fileName, function(err) {
    if (err) {
      next(err);
    } else {
      console.log("sent:", fileName);
    }
  });
});

app.get("/search/:word/:num", async (req, res) => {
  console.log(req.url);
  const word = req.params.word;
  const num = req.params.num;
  const gifUrls = await search(word, num);
  console.log(typeof gifUrls);
  res.json({ searchresult: gifUrls }); //object
});

app.get("/search/", function(req, res, next) {
  console.log("別の");
});

app.listen(PORT, function(err) {
  if (err) console.log(err);
  console.log("Start Server!");
});
