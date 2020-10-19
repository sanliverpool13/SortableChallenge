class Auction {
  constructor(site, units, bids) {
    this.site = site;
    this.bids = bids;
    this.unitBidMap = {};
    this.initUnitBidMap(units);
    this.finalBids = [];
    this.validBids = 0;
  }

  initUnitBidMap(units) {
    units.forEach((unit) => {
      this.unitBidMap[unit] = {};
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
    this.validBids++;

    let currentBidForUnit = this.unitBidMap[bid["unit"]];
    if (!Object.keys(currentBidForUnit).length) {
      this.unitBidMap[bid["unit"]] = bid;
    } else {
      let adjustedAmount = bid["bid"] * (1 + bidder.adjustment);
      process.stdout.write("here\n");
      if (adjustedAmount > currentBidForUnit["bid"]) {
        this.unitBidMap[bid["unit"]] = bid;
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
