#!/usr/bin/env node
const fs = require("fs");
const Platform = require("./Platfrom");

let raw_data = fs.readFileSync("config.json");
let config_data = JSON.parse(raw_data);

let stdin = process.stdin,
  stdout = process.stdout,
  inputChunks = [],
  parsedData;

stdin.resume();
stdin.setEncoding("utf8");

stdin.on("data", function (chunk) {
  inputChunks.push(chunk);
});

stdin.on("end", function () {
  var inputJSON = inputChunks.join("");
  parsedData = JSON.parse(inputJSON);
  let platform = new Platform(config_data, parsedData);
  platform.runAuction();
  outputJSON = JSON.stringify(platform.getFinalBids());
  stdout.write(outputJSON);
  stdout.write("\n");
});

// outputJSON = JSON.stringify(parsedData, null, "    ");
//   stdout.write(outputJSON);
//   stdout.write("\n");
