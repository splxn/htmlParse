"use strict";
const fs = require('fs');

function parseHTML(file) {

  function readHTML() {
    return new Promise((resolve, reject) => {
      fs.readFile(file, 'utf8', (err, body) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(body);
      });
    });
  }

  function parseHTMLRecursive(body) {

    const regex = /<([a-z0-9]+)([^>]*)?>(.|\s)*?<\/\1>/g;

    let parsed = body.match(regex);

    let arrElems = [];

    if (!regex.test(body)) {
      return body;
    } else {

      parsed.forEach((item) => {
        let elem = {};
        elem.tag = item.match(/([a-z0-9]+)/)[0];
        elem.children = [];

        let child = item
          .replace(/^<([a-z0-9]+)([^>]*)?>/g, "")
          .replace(/<\/[a-z0-9]+>$/g, "")
          .trim();

        elem.children = parseHTMLRecursive(child);
        arrElems.push(elem);
      });
      return arrElems;
    }
  }

  readHTML()
    .then(parseHTMLRecursive)
    .then((value) => console.log(JSON.stringify(value, null, 2)))
    .catch(function(err) {
      throw new Error('Cannot read file');
    })
}

parseHTML('index.html');