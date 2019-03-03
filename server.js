const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/world", (req, res) => {
  let numofarrelemn = req.body["post"];
  console.log(numofarrelemn);

  //fetch api given
  fetch("https://gitlab.com/snippets/1824628/raw")
    .then(res => res.text())
    .then(body => {
      //regex to remove any special character
      let cleanString = body.replace(/[\.,-\/#!$%\^&\*'';:{}=\-_`~()‘’]/g, "");

      let cleanArray = cleanString.split(/\s+/);

      return cleanArray;
    })
    .then(cleanArray => {
      let wordsMap = {};
      cleanArray.forEach(function(key) {
        if (wordsMap.hasOwnProperty(key)) {
          wordsMap[key]++;
        } else {
          wordsMap[key] = 1;
        }
      });

      //console.log(wordsMap);

      return wordsMap;
    })
    .then(wordsMap => {
      let finalWordsArray = [];

      // sort by count in descending order
      finalWordsArray = Object.keys(wordsMap).map(function(key) {
        return {
          name: key,
          total: wordsMap[key]
        };
      });

      finalWordsArray.sort(function(a, b) {
        return b.total - a.total;
      });

      let numoffinalWordsArr = finalWordsArray.slice(0, numofarrelemn);

      console.log(numoffinalWordsArr);
      res.send(numoffinalWordsArr);
    });
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
