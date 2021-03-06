# Instructions To Build and Run

The steps are the same as you specified in the instructions. 
```
$ docker build -t challenge .
$ docker run -i -v /path/to/test/config.json:/auction/config.json challenge < /path/to/test/input.json
```

## Explanation of Code
I created classes Platform, Auction and Site. The platform would be the object where the auctions would be run. The auction 
object represented the auction with a site property, a units array property, and the bids array property. Finally the sites themselves
would be represented by a Site object with name property, a floor property, and allowed bidders array property.

The platform object kept arrays of the site objects, the bidder objects, and the auction objects. 

The auction was run by calling the platform.runAuction() method. The method iterated through all of the auctions in the platform auctions
array, and for each it checked whether auctions were valid for the site. For each auction the program also iterated over all of its bids.

The platform had methods to check whether the current auction's site was valid, whether a bid's bidder was valid. 
The auction had methods to check whether the bids is larger than the floor amount and whether the unit being bid on was valid.

## Entry Point 
The program is run by running the command `npm start`. index.js is the file that is run. It imports the Platform class and creates an object.
It gets data from the config.json file, as well as from the stdin of the nodejs process. Once all the lines from stdin are read and collected into
an array, the array is converted to JSON and is fed into method to create a new platform object.

## Testing
I tested the algorithm by running `npm test`, and by running the docker container as well. I hope I didn't miss anything.
