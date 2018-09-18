const fs = require("fs");

const pathname = process.argv[2];
const componentName = process.argv[3];

(async () => {
  await fs.mkdirSync(`${pathname}${componentName}`);
  await fs.readFile(
    "./scripts/create-component/create-component-template.js",
    "utf8",
    (err, data) => {
      if (err) {
        return console.log(err);
      }
      const result = data.replace(/componentName/g, componentName);
      fs.writeFile(
        `${pathname}/${componentName}/${componentName}.js`,
        result,
        "utf8",
        writeErr => {
          if (writeErr) return console.log(writeErr);
        }
      );
    }
  );
  await fs.readFile(
    "./scripts/create-component/create-container-template.js",
    "utf8",
    (err, data) => {
      if (err) {
        return console.log(err);
      }
      const result = data.replace(/componentName/g, componentName);
      fs.writeFile(
        `${pathname}/${componentName}/${componentName}.container.js`,
        result,
        "utf8",
        writeErr => {
          if (writeErr) return console.log(writeErr);
        }
      );
    }
  );
  await fs.readFile(
    "./scripts/create-component/create-stylesheet-template.js",
    "utf8",
    (err, data) => {
      if (err) {
        return console.log(err);
      }
      fs.writeFile(
        `${pathname}/${componentName}/${componentName}.style.js`,
        data,
        "utf8",
        writeErr => {
          if (writeErr) return console.log(writeErr);
        }
      );
    }
  );
  await fs.readFile(
    "./scripts/create-component/create-types-template.js",
    "utf8",
    (err, data) => {
      if (err) {
        return console.log(err);
      }
      fs.writeFile(
        `${pathname}/${componentName}/types.js`,
        data,
        "utf8",
        writeErr => {
          if (writeErr) return console.log(writeErr);
        }
      );
    }
  );
  await fs.readFile(
    "./scripts/create-component/create-actions-template.js",
    "utf8",
    (err, data) => {
      if (err) {
        return console.log(err);
      }
      fs.writeFile(
        `${pathname}/${componentName}/actions.js`,
        data,
        "utf8",
        writeErr => {
          if (writeErr) return console.log(writeErr);
        }
      );
    }
  );
  await fs.readFile(
    "./scripts/create-component/create-saga-template.js",
    "utf8",
    (err, data) => {
      if (err) {
        return console.log(err);
      }
      fs.writeFile(
        `${pathname}/${componentName}/saga.js`,
        data,
        "utf8",
        writeErr => {
          if (writeErr) return console.log(writeErr);
        }
      );
    }
  );
  await fs.readFile(
    "./scripts/create-component/create-reducer-template.js",
    "utf8",
    (err, data) => {
      if (err) {
        return console.log(err);
      }
      fs.writeFile(
        `${pathname}/${componentName}/reducer.js`,
        data,
        "utf8",
        writeErr => {
          if (writeErr) return console.log(writeErr);
        }
      );
    }
  );
})();
