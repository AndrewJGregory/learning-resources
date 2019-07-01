const fs = require("fs");

// step 1: callback

const hasName = target => {
  fs.readFile("./data.csv", (err, buffer) => {
    const names = buffer
      .toString()
      .split("\n")
      .slice(1)
      .filter(str => str)
      .map(str => JSON.parse(str.split(",")[1]));
    const count = names.reduce(
      (sum, name) => (name === target ? ++sum : sum),
      0
    );
    console.log(count);
  });
};

// step 2: promises

const hasNamePromise = target => {
  readTheFile("./data.csv").then(res => {
    const count = res.reduce((sum, name) => (name === target ? ++sum : sum), 0);
    console.log(count);
  });
};

const readTheFile = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, buffer) => {
      if (err) reject(err);
      const names = buffer
        .toString()
        .split("\n")
        .slice(1)
        .filter(str => str)
        .map(str => JSON.parse(str.split(",")[1]));
      resolve(names);
    });
  });
};
