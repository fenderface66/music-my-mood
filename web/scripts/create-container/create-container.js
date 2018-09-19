const fs = require("fs");

const pathname = "./src/containers/";
const containerName = process.argv[2];

(async () => {
  await fs.mkdirSync(`${pathname}${containerName}`);
  await fs.readFile(
    "./scripts/create-container/create-container-template.js",
    "utf8",
    (err, data) => {
      if (err) {
        return console.log(err);
      }
      const result = data.replace(/containerName/g, containerName);
      fs.writeFile(
        `${pathname}/${containerName}/${containerName}.js`,
        result,
        "utf8",
        writeErr => {
          if (writeErr) return console.log(writeErr);
        }
      );
    }
  );
  await fs.readFile(
    "./scripts/create-container/create-stylesheet-template.js",
    "utf8",
    (err, data) => {
      if (err) {
        return console.log(err);
      }
      fs.writeFile(
        `${pathname}/${containerName}/${containerName}.style.js`,
        data,
        "utf8",
        writeErr => {
          if (writeErr) return console.log(writeErr);
        }
      );
    }
  );
  await fs.readFile(
    "./scripts/create-container/create-types-template.js",
    "utf8",
    (err, data) => {
      if (err) {
        return console.log(err);
      }
      fs.writeFile(
        `${pathname}/${containerName}/types.js`,
        data,
        "utf8",
        writeErr => {
          if (writeErr) return console.log(writeErr);
        }
      );
    }
  );
  await fs.readFile(
    "./scripts/create-container/create-actions-template.js",
    "utf8",
    (err, data) => {
      if (err) {
        return console.log(err);
      }
      fs.writeFile(
        `${pathname}/${containerName}/actions.js`,
        data,
        "utf8",
        writeErr => {
          if (writeErr) return console.log(writeErr);
        }
      );
    }
  );
  await fs.readFile(
    "./scripts/create-container/create-saga-template.js",
    "utf8",
    (err, data) => {
      if (err) {
        return console.log(err);
      }
      fs.writeFile(
        `${pathname}/${containerName}/saga.js`,
        data,
        "utf8",
        writeErr => {
          if (writeErr) return console.log(writeErr);
        }
      );
    }
  );
  await fs.readFile(
    "./scripts/create-container/create-reducer-template.js",
    "utf8",
    (err, data) => {
      if (err) {
        return console.log(err);
      }
      fs.writeFile(
        `${pathname}/${containerName}/reducer.js`,
        data,
        "utf8",
        writeErr => {
          if (writeErr) return console.log(writeErr);
        }
      );
    }
  );
})();
