const fs = require("fs");

let raw_data = fs.readFileSync("config.json");
let config_data = JSON.parse(raw_data);

let raw_data_2 = fs.readFileSync("input.json");
let input_data = JSON.parse(raw_data_2);

const Platform = require("./Platfrom");

let platform = new Platform(
  config_data["sites"],
  config_data["bidders"],
  input_data
);
platform.runAuctions();
platform.getFinalBids();
