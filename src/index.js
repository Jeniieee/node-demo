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

// create a server object:
http
  .createServer(function (req, res) {
    res.write("Hello nodejs!"); //write a response to the client
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080
