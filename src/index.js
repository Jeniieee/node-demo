// var a = require("./a.js");
// var add = require("./b.js");
// var c = require("./c.js");
// var d = require("./d.js");

// d.num = 9;

// console.log(a);
// console.log(add(1, 4));
// console.log(c);
// console.log(d.num);

var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");
var qs = require("querystring");

function notFound(req, res) {
  fs.readFile(path.join(__dirname, "404.html"), (err, data) => {
    if (err) {
      res.write(404, "Not Found");
    } else {
      res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
      res.write(data);
      res.end();
    }
  });
}

// create a server object:
http
  .createServer(function (req, res) {
    let pathName = url.parse(req.url).pathname;
    console.log(pathName);

    if (pathName.startsWith("/api")) {
      const method = req.method;
      if (method === "GET") {
        console.log(method);
        let query = qs.parse(url.parse(req.url).query);
        let resData = {
          code: 200,
          msg: "success",
          data: query
        };
        res.end(JSON.stringify(resData));
        return;
      }
      if (method === "POST") {
        const contentType = req.headers["content-type"];
        if (contentType === "application/json") {
          let postData = "";
          req.on("data", (chunk) => {
            postData += chunk;
          });
          req.on("end", () => {
            res.end(postData);
          });
          return;
        }
      }
    }

    if (pathName === "/") {
      pathName = path.join(__dirname, "index.html");
    }

    const extName = path.extname(pathName);
    if (extName === ".html") {
      fs.readFile(pathName, (err, data) => {
        if (err) {
          notFound(req, res);
        } else {
          res.writeHead(200, { "Content-Type": "text/html;charset='utf-8'" });
          res.write(data);
          res.end();
        }
      });
    }
    // res.write("Hello nodejs!"); //write a response to the client
    // res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080
