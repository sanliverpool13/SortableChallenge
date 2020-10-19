const Site = require("./Site");
const Bidder = require("./Bidder");
const Auction = require("./Auction");

class Platform {
  constructor(sites, bidders, auctions) {
    this.sites = {};
    this.bidders = {};
    this.auctions = [];
    this.initSites(sites);
    this.initBidders(bidders);
    this.initAuctions(auctions);
  }

  initSites(sites) {
    sites.forEach((site) => {
      this.sites[site["name"]] = new Site(
        site["name"],
        site["floor"],
        site["bidders"]
      );
    });
  }

  initBidders(bidders) {
    bidders.forEach((bidder) => {
      this.bidders[bidder["name"]] = new Bidder(
        bidder["name"],
        bidder["adjustment"]
      );
    });
  }

  initAuctions(auctions) {
    auctions.forEach((auction) => {
      this.auctions.push(
        new Auction(auction["site"], auction["units"], auction["bids"])
      );
    });
  }

  isSiteInvalid(auctionSite) {
    return !this.sites[auctionSite];
  }

  isBidderInvalid(site, bidderName) {
    return !(this.bidders[bidderName] || this.sites[site].bidders[bidderName]);
  }

  runAuction() {
    this.auctions.forEach((auction) => {
      if (this.isSiteInvalid(auction.site)) {
        continue;
      }
      auction.bids.forEach((bid) => {
        if (this.isBidderInvalid(auction.site, bid["bidder"])) {
          continue;
        }
        if (auction.isUnitInvalid(bid["unit"])) {
          continue;
        }
        if (
          !auction.isFloor(
            bid,
            this.sites[auction.site].floor,
            this.bidders[bid["bidder"]]
          )
        ) {
          continue;
        }
        auction.setMaxUnitBids(bid, this.bidders[bid["bidder"]]);
      });
    });
  }
  getFinalBids() {
    auctionResults = [];
    this.auctions.forEach((auction) => {
      auction.setFinalBids();
      auctionResults.push(auction.finalBids);
    });

    console.log(auctionResults);
  }
}
