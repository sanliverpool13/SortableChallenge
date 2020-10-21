class Auction {
  constructor(auction) {
    this.site = auction["site"];
    this.bids = auction["bids"];
    this.bidsPerUnitMap = {};
    this.maxAdjustedBidPerUnit = {};
    this.initbidsPerUnitMap(auction["units"]);

    this.finalBids = [];
    this.validBids = 0;
  }

  initbidsPerUnitMap(units) {
    units.forEach((unit) => {
      this.bidsPerUnitMap[unit] = {};
      this.maxAdjustedBidPerUnit[unit] = {};
    });
  }

  isUnitInvalid(unit) {
    return !this.bidsPerUnitMap[unit];
  }

  isFloor(bid, floor, bidder) {
    let adjustedAmount = bid["bid"] * (1 + bidder.adjustment);
    return adjustedAmount >= floor;
  }

  isBidsPerUnitMapEmptyForUnit(unit) {
    return !Object.keys(this.bidsPerUnitMap[unit]).length;
  }

  setNewMaxBidForUnit(unit, bid, newAdjustedAmount) {
    this.bidsPerUnitMap[unit] = bid;
    this.maxAdjustedBidPerUnit[unit] = newAdjustedAmount;
  }

  isNewBidAdjustedBigger(adjustedAmount, unit) {
    return adjustedAmount > this.maxAdjustedBidPerUnit[unit];
  }

  setMaxUnitBid(bid, bidder) {
    this.validBids++;
    let adjustedAmount = bid["bid"] * (1 + bidder.adjustment);
    if (this.isBidsPerUnitMapEmptyForUnit(bid["unit"])) {
      this.setNewMaxBidForUnit(bid["unit"], bid, adjustedAmount);
    } else {
      if (this.isNewBidAdjustedBigger(adjustedAmount, bid["unit"])) {
        this.setNewMaxBidForUnit(bid["unit"], bid, adjustedAmount);
      }
    }
  }

  setFinalBids() {
    if (this.validBids === 0) {
      this.finalBids = [];
    } else {
      this.finalBids = Object.values(this.bidsPerUnitMap);
    }
  }
}

module.exports = Auction;
