const fs = require("fs");

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

hasName("Andrew");
