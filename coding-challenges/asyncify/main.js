function countNameCallback(target) {
  // target is a string
  // print out the names in a callback
}

function countNamePromise(target) {
  // should read as follows:
  readTheFile(path).then(
    result => {
      // print out how many times the name appeared
    },
    err => {
      // handle err
    }
  );
}

async function countNameAsyncAwait(target) {
  const names = await readTheFile(path);
  // print how many times the name appeared
}

function readTheFile(path) {
  // returns a promise
}
