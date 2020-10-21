const Site = require("./Site");
const Auction = require("./Auction");

class Platform {
  constructor(config_data, input_data) {
    this.sites = {};
    this.bidders = {};
    this.auctions = [];
    this.initSites(config_data["sites"]);
    this.initBidders(config_data["bidders"]);
    this.initAuctions(input_data);
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
      this.bidders[bidder["name"]] = bidder;
    });
  }

  initAuctions(auctions) {
    auctions.forEach((auction) => {
      this.auctions.push(new Auction(auction));
    });
  }

  isSiteInvalid(auctionSite) {
    return !this.sites[auctionSite];
  }

  isBidderInvalid(site, bidderName) {
    return !this.bidders[bidderName] || !this.sites[site].bidders[bidderName];
  }

  runAuction() {
    this.auctions.forEach((auction) => {
      if (this.isSiteInvalid(auction.site)) {
        return;
      }

      auction.bids.forEach((bid) => {
        if (this.isBidderInvalid(auction.site, bid["bidder"])) {
          return;
        }
        if (auction.isUnitInvalid(bid["unit"])) {
          return;
        }
        if (
          !auction.isFloor(
            bid,
            this.sites[auction.site].floor,
            this.bidders[bid["bidder"]]
          )
        ) {
          return;
        }

        auction.setMaxUnitBid(bid, this.bidders[bid["bidder"]]);
      });
    });
  }
  getFinalBids() {
    let auctionResults = [];
    this.auctions.forEach((auction) => {
      auction.setFinalBids();

      auctionResults.push(auction.finalBids);
    });

    return auctionResults;
  }
}

module.exports = Platform;
