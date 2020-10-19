class Site {
  constructor(name, floor, bidders) {
    this.name = name;
    this.floor = floor;
    this.bidders = {};
    this.initBidders(bidders);
  }

  initBidders(bidders) {
    bidders.forEach((bidder) => {
      this.bidders[bidder] = true;
    });
  }
}
