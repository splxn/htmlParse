"use strict";
var fs = require('fs');

var regex = /<([^>]+)>(.|\s)*?<\/\1>/g;

function processHTML(file) {

  fs.readFile(file, 'utf8', (err, body) => {
    if (err) throw err;
    var arr = [];

    var parsed = body.match(regex);

    parsed.forEach(function getObj(item) {

      var test = {};
      test.tag = item.match(/[a-z0-9]+/)[0];
      test.content = item
        .replace(/^<([a-z0-9]+)>/g, "")
        .replace(/<\/[a-z0-9]+>$/g, "")
        .trim();
      arr.push(test);
      console.log(test.content);
    });
    console.log(arr);
  });
}

processHTML('index.html');