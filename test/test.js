const expect = require("chai").expect;
const Site = require("../Site");
// const Bidder = require("../../Bidder");
const Auction = require("../Auction");
const Platform = require("../Platfrom");

const configData = require("./config");
const inputData = require("./input");
const outputData = require("./output");

describe("Classes Created With Expected Parameters", function () {
  // it("Bidder Object Has Name and Adjustment rate", function () {
  //   let name = "AUCT";
  //   let adjustment = -0.0625;

  //   let bidder = new Bidder(name, adjustment);

  //   expect(bidder.name).to.be.equal("AUCT");
  //   expect(bidder.adjustment).to.be.equal(-0.0625);
  // });

  it("Site Object Has Name, floor and a list of bidders", function () {
    let name = "houseofcheese.com";
    let floor = 35;
    let bidders = ["AUCT", "BDD"];

    let site = new Site(name, floor, bidders);

    expect(site.name).to.be.equal(name);
    expect(site.floor).to.be.equal(floor);
    expect(site.bidders).to.own.include({ AUCT: true });
    expect(site.bidders).to.own.include({ BDD: true });
  });

  it("Auction Object has site, bids, bids per unit object, valid bids counter, final bids array", function () {
    let auctionInput = {
      site: "houseofcheese.com",
      units: ["banner", "sidebar"],
      bids: [
        {
          bidder: "AUCT",
          unit: "banner",
          bid: 35,
        },
        {
          bidder: "BIDD",
          unit: "sidebar",
          bid: 60,
        },
        {
          bidder: "AUCT",
          unit: "sidebar",
          bid: 55,
        },
      ],
    };

    let auction = new Auction(auctionInput);

    expect(auction.site).to.be.equal("houseofcheese.com");
    expect(auction.bids).to.have.deep.members([
      {
        bidder: "AUCT",
        unit: "banner",
        bid: 35,
      },
      {
        bidder: "BIDD",
        unit: "sidebar",
        bid: 60,
      },
      {
        bidder: "AUCT",
        unit: "sidebar",
        bid: 55,
      },
    ]);
    expect(auction.bidsPerUnitMap).to.have.keys(["banner", "sidebar"]);
    expect(auction.finalBids).to.deep.equal([]);
    expect(auction.validBids).to.be.equal(0);
  });
});

describe("Test Validation Methods For Platform and Auction", function () {
  it("Test the auction site validation method", function () {
    let config_data = {
      sites: [
        {
          name: "houseofcheese.com",
          bidders: ["AUCT", "BIDD"],
          floor: 32,
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
      ],
    };
    let input_data = [
      {
        site: "houseofcheese.com",
        units: ["banner", "sidebar"],
        bids: [
          {
            bidder: "AUCT",
            unit: "banner",
            bid: 35,
          },
        ],
      },
      {
        site: "houseofcards.com",
        units: ["banner", "sidebar"],
        bids: [
          {
            bidder: "AUCT",
            unit: "banner",
            bid: 35,
          },
        ],
      },
    ];

    let platform = new Platform(config_data, input_data);
    let invalidSite = platform.isSiteInvalid(input_data[1]["site"]);
    let validSite = platform.isSiteInvalid(input_data[0]["site"]);

    expect(invalidSite).to.be.equal(true);
    expect(validSite).to.be.equal(false);
  });

  it("Test the bidder validation method of platform", function () {
    let config_data = {
      sites: [
        {
          name: "houseofcheese.com",
          bidders: ["AUCT"],
          floor: 32,
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
      ],
    };
    let input_data = [
      {
        site: "houseofcheese.com",
        units: ["banner", "sidebar"],
        bids: [
          {
            bidder: "AUCT",
            unit: "banner",
            bid: 35,
          },
          {
            bidder: "AUCT",
            unit: "banner",
            bid: 35,
          },
        ],
      },
      {
        site: "houseofcards.com",
        units: ["banner", "sidebar"],
        bids: [
          {
            bidder: "AUC",
            unit: "banner",
            bid: 35,
          },
        ],
      },
    ];

    let platform = new Platform(config_data, input_data);
    let unknownBidder = platform.isBidderInvalid("houseofcheese.com", "AUC");
    let invalidBidder = platform.isBidderInvalid("houseofcheese.com", "BIDD");
    let validBidder = platform.isBidderInvalid("houseofcheese.com", "AUCT");

    expect(unknownBidder).to.be.equal(true);
    expect(invalidBidder).to.be.equal(true);
    expect(validBidder).to.be.equal(false);
  });

  it("Test Auction unit validation methid", function () {
    let singleAuction = {
      site: "houseofcheese.com",
      units: ["banner", "sidebar"],
      bids: [
        {
          bidder: "AUCT",
          unit: "banner",
          bid: 35,
        },
        {
          bidder: "BIDD",
          unit: "bann",
          bid: 35,
        },
      ],
    };

    let auction = new Auction(singleAuction);
    let invalidUnit = auction.isUnitInvalid("bb");
    let validUnit = auction.isUnitInvalid("banner");

    expect(invalidUnit).to.be.equal(true);
    expect(validUnit).to.be.equal(false);
  });

  it("Test isFloor method of auction object to see if bids below or above floor are properly treated", function () {
    let singleAuction = {
      site: "houseofcheese.com",
      units: ["banner", "sidebar"],
      bids: [
        {
          bidder: "AUCT",
          unit: "banner",
          bid: 25,
        },
        {
          bidder: "BIDD",
          unit: "bann",
          bid: 35,
        },
      ],
    };

    let bidders = [
      {
        name: "AUCT",
        adjustment: -0.0625,
      },
      {
        name: "BIDD",
        adjustment: 0,
      },
    ];

    let auction = new Auction(singleAuction);

    let belowFloor = auction.isFloor(singleAuction["bids"][0], 32, bidders[0]);
    let expectedResult = 25 * (1 - 0.0625) >= 32;

    let aboveFloor = auction.isFloor(singleAuction["bids"][1], 32, bidders[1]);
    let expectedResults2 = 35 * (1 - 0) >= 32;

    expect(belowFloor).to.be.equal(expectedResult);
    expect(aboveFloor).to.be.equal(expectedResults2);
  });
});

describe("Auction Set Current Max Bid Method", function () {
  it("Making Sure Auction method sets the right current max bid", function () {
    let singleAuction = {
      site: "houseofcheese.com",
      units: ["banner", "sidebar"],
      bids: [
        {
          bidder: "AUCT",
          unit: "banner",
          bid: 35,
        },
        {
          bidder: "BIDD",
          unit: "sidebar",
          bid: 35,
        },
        {
          bidder: "BIDD",
          unit: "banner",
          bid: 36,
        },
        {
          bidder: "AUCT",
          unit: "banner",
          bid: 30,
        },
      ],
    };

    let bidders = [
      {
        name: "AUCT",
        adjustment: -0.0625,
      },
      {
        name: "BIDD",
        adjustment: 0,
      },
    ];

    let auction = new Auction(singleAuction);

    expect(auction.bidsPerUnitMap).to.deep.include({ banner: {}, sidebar: {} });

    auction.setMaxUnitBid(singleAuction["bids"][0], bidders[0]);

    expect(auction.bidsPerUnitMap).to.deep.include({
      banner: singleAuction["bids"][0],
      sidebar: {},
    });

    auction.setMaxUnitBid(singleAuction["bids"][1], bidders[1]);

    expect(auction.bidsPerUnitMap).to.deep.include({
      banner: singleAuction["bids"][0],
      sidebar: singleAuction["bids"][1],
    });

    auction.setMaxUnitBid(singleAuction["bids"][2], bidders[1]);

    expect(auction.bidsPerUnitMap).to.deep.include({
      banner: singleAuction["bids"][2],
      sidebar: singleAuction["bids"][1],
    });

    auction.setMaxUnitBid(singleAuction["bids"][3], bidders[1]);

    expect(auction.bidsPerUnitMap).to.deep.include({
      banner: singleAuction["bids"][2],
      sidebar: singleAuction["bids"][1],
    });
  });

  it("Test auction method to return final bids in array format per auction", function () {
    let singleAuction = {
      site: "houseofcheese.com",
      units: ["banner", "sidebar"],
      bids: [
        {
          bidder: "AUCT",
          unit: "banner",
          bid: 35,
        },
        {
          bidder: "BIDD",
          unit: "sidebar",
          bid: 35,
        },
        {
          bidder: "BIDD",
          unit: "banner",
          bid: 36,
        },
        {
          bidder: "AUCT",
          unit: "banner",
          bid: 30,
        },
      ],
    };

    let bidders = [
      {
        name: "AUCT",
        adjustment: -0.0625,
      },
      {
        name: "BIDD",
        adjustment: 0,
      },
    ];

    let auction = new Auction(singleAuction);

    auction.setFinalBids();

    expect(auction.finalBids).to.deep.equal([]);

    auction.setMaxUnitBid(singleAuction["bids"][0], bidders[0]);
    auction.setFinalBids();

    expect(auction.finalBids).to.have.deep.members([
      singleAuction["bids"][0],
      {},
    ]);

    auction.setMaxUnitBid(singleAuction["bids"][1], bidders[1]);
    auction.setFinalBids();
    expect(auction.finalBids).to.have.deep.members([
      singleAuction["bids"][0],
      singleAuction["bids"][1],
    ]);

    auction.setMaxUnitBid(singleAuction["bids"][2], bidders[1]);
    auction.setFinalBids();
    expect(auction.finalBids).to.have.deep.members([
      singleAuction["bids"][2],
      singleAuction["bids"][1],
    ]);
  });
});

describe("Test the output of platform running entire algorithm by running auction", function () {
  it("Run platfrom runAuction method for a large number of inputs", function () {
    let platform = new Platform(configData, inputData);
    platform.runAuction();
    let results = platform.getFinalBids();

    expect(results).to.have.deep.members(outputData);
  });
});
