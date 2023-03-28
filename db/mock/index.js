const fs = require('fs');
const { mock1 } = require('./mock');
const { mock2 } = require('./mock2');

function generate(mock, filename) {
  for (let { id, name, timestamp, avg, count, min, max } of mock) {
    const content = `INSERT INTO factorial.factorial.Metrics (Id, Name, Timestamp, Avg, Count, Min, Max)\nVALUES ("${id}", "${name}", "${timestamp}", ${avg}, ${count}, ${min}, ${max});\n`;
    fs.appendFileSync(filename, content);
  }
}

generate(mock1, './mock.sql');
generate(mock2, './mock2.sql');
