const fs = require("fs");

// step 1: callback

const hasNameCallback = target => {
  fs.readFile("./data.csv", (err, buffer) => {
    if (err) {
      console.log(err);
    } else {
      const names = buffer
        .toString()
        .split("\n")
        .slice(1)
        .filter(str => str)
        .map(str => JSON.parse(str.split(",")[1]));
      console.log(countInArr(names, target));
    }
  });
};

// step 2: promises

const hasNamePromise = target => {
  readTheFile("./data.csv").then(
    res => {
      console.log(countInArr(res, target));
    },
    err => console.log(err)
  );
};

const readTheFile = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        const names = buffer
          .toString()
          .split("\n")
          .slice(1)
          .filter(str => str)
          .map(str => JSON.parse(str.split(",")[1]));
        resolve(names);
      }
    });
  });
};

// step 3: async await

const hasNameAsyncAwait = async target => {
  try {
    const names = await readTheFile("./data.csv");
    console.log(countInArr(names, target));
  } catch (e) {
    console.log(e);
  }
};

const countInArr = (arr, target) => arr.filter(el => el === target).length;

hasNameCallback("Andrew");
