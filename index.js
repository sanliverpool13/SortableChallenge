#!/usr/bin/env node
const fs = require("fs");

let raw_data = fs.readFileSync("config.json");
let config_data = JSON.parse(raw_data);

var stdin = process.stdin,
  stdout = process.stdout,
  inputChunks = [],
  parsedData;

const Platform = require("./Platfrom");

stdin.resume();
stdin.setEncoding("utf8");

stdin.on("data", function (chunk) {
  inputChunks.push(chunk);
});

stdin.on("end", function () {
  var inputJSON = inputChunks.join("");
  parsedData = JSON.parse(inputJSON);
  console.log(parsedData);
  let platform = new Platform(
    config_data["sites"],
    config_data["bidders"],
    parsedData
  );
  platform.runAuction();
  outputJSON = JSON.stringify(platform.getFinalBids());
  stdout.write(outputJSON);
  stdout.write("\n");
});

// let raw_data_2 = fs.readFileSync("input.json");
// let input_data = JSON.parse(raw_data_2);

// outputJSON = JSON.stringify(parsedData, null, "    ");
//   stdout.write(outputJSON);
//   stdout.write("\n");
