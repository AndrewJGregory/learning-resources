const fs = require("fs");

// step 1: callback

const hasNameCallback = target => {
  fs.readFile("./data.csv", (err, buffer) => {
    if (err) {
      console.log(err);
    } else {
      const { names } = parseBuffer(buffer);
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
        const { names } = parseBuffer(buffer);
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

const parseBuffer = buffer => {
  const data = { years: [], names: [], percents: [], sexes: [] };
  const formattedStr = buffer
    .toString()
    .replace(/"/g, "")
    .split("\n");
  formattedStr.splice(0, 1);
  formattedStr
    .map(row => row.split(","))
    .forEach(([year, name, percent, sex]) => {
      data.years.push(year);
      data.names.push(name);
      data.percents.push(percent);
      data.sexes.push(sex);
    });
  return data;
};
