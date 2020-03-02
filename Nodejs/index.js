const fs = require("fs");
const http = require("http");
const url = require("url");

/////////////files///////////////////////////
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = textIn + " this is text that will be written " + new Date();

// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("file written");

// //Async
// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   fs.readFile("./txt/read-first.txt", "utf-8", (err, data) => {
//     console.log(data);
//   });
//   console.log(data);
// });
// console.log("second console");

///////////////////////Server//////////////////////////////////
const data = fs.readFileSync(`${__dirname}/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName == "/overview") {
    res.end("this is the overview");
  } else if (pathName == "/product") {
    res.end("this is the product page");
  } else if (pathName == "/api") {
    res.writeHead(200, {
      "Content-type": "application/json"
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello world"
    });
    res.end("<p>hello from the server</p>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("server started");
});
