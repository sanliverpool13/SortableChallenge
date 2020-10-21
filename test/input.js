const fs = require("fs");
const path = require("path");
let generatedBids = [];
for (let i = 1; i < 1001; i++) {
  let bid;
  if (i % 2 === 0) {
    bid = {
      bidder: "AUCT",
      unit: "bann",
      bid: i,
    };
  } else {
    bid = {
      bidder: "BIDD",
      unit: "sidebar",
      bid: i,
    };
  }
  generatedBids.push(bid);
}

let auctionsArray = [
  {
    site: "houseofcheese.com",
    units: ["banner", "sidebar"],
    bids: generatedBids,
  },
  {
    site: "houseofcoffee.com",
    units: ["banner", "sidebar", "second", "third"],
    bids: [
      {
        bidder: "AUCT",
        unit: "banner",
        bid: 36,
      },
      { bidder: "ST", unit: "banner", bid: 36 },
      {
        bidder: "STAR",
        unit: "tt",
        bid: 45,
      },
      {
        bidder: "STAR",
        unit: "banner",
        bid: 34,
      },
      {
        bidder: "STAR",
        unit: "sidebar",
        bid: 39,
      },
      {
        bidder: "BLUE",
        unit: "second",
        bid: 39,
      },
      {
        bidder: "STAR",
        unit: "second",
        bid: 341,
      },
    ],
  },
  {
    site: "bbb.com",
    units: ["banner"],
    bids: [
      {
        bidder: "AUCT",
        bidder: "banner",
        bid: 35,
      },
    ],
  },
];

fs.writeFileSync(
  path.resolve(__dirname, "input.json"),
  JSON.stringify(auctionsArray)
);

module.exports = auctionsArray;
