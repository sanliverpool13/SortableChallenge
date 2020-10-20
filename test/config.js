module.exports = {
  sites: [
    {
      name: "houseofcheese.com",
      bidders: ["AUCT", "BIDD"],
      floor: 32,
    },
    {
      name: "houseofcoffee.com",
      bidders: ["STAR", "BLUE"],
      floor: 36,
    },
  ],
  bidders: [
    {
      name: "AUCT",
      adjustment: -0.0625,
    },
    {
      name: "BIDD",
      adjustment: 0,
    },
    {
      name: "STAR",
      adjustment: -0.05,
    },
    {
      name: "BLUE",
      adjustment: -0.043,
    },
  ],
};
