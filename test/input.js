let generatedBids = [];
for (let i = 1; i < 1000001; i++) {
  let bid = {
    bidder: "AUCT",
    unit: "banner",
    bid: i,
  };
  generatedBids.push(bid);
}

module.exports = [
  {
    site: "houseofcheese.com",
    // units: ["banner", "sidebar", "second", "third"],
    units: ["banner", "sidebar"],
    bids: generatedBids,
    // [
    //   {
    //     bidder: "AUCT",
    //     unit: "banner",
    //     bid: 35,
    //   },
    //   {
    //     bidder: "BIDD",
    //     unit: "sidebar",
    //     bid: 60,
    //   },
    //   {
    //     bidder: "AUCT",
    //     unit: "sidebar",
    //     bid: 55,
    //   },
    //   {
    //     bidder: "AUCT",
    //     unit: "second",
    //     bid: 30,
    //   },
    //   {
    //     bidder: "AUCT",
    //     unit: "third",
    //     bid: 55,
    //   },
    //   {
    //     bidder: "AUCT",
    //     unit: "fourth",
    //     bid: 55,
    //   },
    // ],
  },
  //   {
  //     site: "houseofcoffee.com",
  //     units: ["banner", "sidebar", "second", "third"],
  //     bids: [
  //       {
  //         bidder: "AUCT",
  //         unit: "banner",
  //         bid: 35,
  //       },
  //       {
  //         bidder: "BL",
  //         unit: "sidebar",
  //         bid: 60,
  //       },
  //       {
  //         bidder: "STAR",
  //         unit: "sidebar",
  //         bid: 55,
  //       },
  //       {
  //         bidder: "BLUE",
  //         unit: "second",
  //         bid: 55,
  //       },
  //       {
  //         bidder: "BLUE",
  //         unit: "third",
  //         bid: 55,
  //       },
  //       {
  //         bidder: "STAR",
  //         unit: "fourth",
  //         bid: 55,
  //       },
  //     ],
  //   },
];
