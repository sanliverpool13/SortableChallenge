class Auction {
  constructor(auction) {
    this.site = auction["site"];
    this.bids = auction["bids"];
    this.unitBidMap = {};
    this.adjustedBidsPerUnit = {};
    this.initUnitBidMap(auction["units"]);

    this.finalBids = [];
    this.validBids = 0;
  }

  initUnitBidMap(units) {
    units.forEach((unit) => {
      this.unitBidMap[unit] = {};
      this.adjustedBidsPerUnit[unit] = {};
    });
  }

  isUnitInvalid(unit) {
    return !this.unitBidMap[unit];
  }

  isFloor(bid, floor, bidder) {
    let adjustedAmount = bid["bid"] * (1 + bidder.adjustment);
    return adjustedAmount >= floor;
  }

  setMaxUnitBid(bid, bidder) {
    if (this.site === "houseofcoffee.com");
    this.validBids++;

    let currentBidForUnit = this.unitBidMap[bid["unit"]];

    if (!Object.keys(currentBidForUnit).length) {
      this.unitBidMap[bid["unit"]] = bid;
      this.adjustedBidsPerUnit[bid["unit"]] =
        bid["bid"] * (1 + bidder.adjustment);
    } else {
      let adjustedAmount = bid["bid"] * (1 + bidder.adjustment);
      if (adjustedAmount > this.adjustedBidsPerUnit[bid["unit"]]) {
        this.unitBidMap[bid["unit"]] = bid;
        this.adjustedBidsPerUnit[bid["unit"]] = adjustedAmount;
      }
    }
  }

  setFinalBids() {
    if (this.validBids === 0) {
      this.finalBids = [];
    } else {
      this.finalBids = Object.values(this.unitBidMap);
    }
  }
}

module.exports = Auction;
