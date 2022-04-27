export interface IConfig {
  totalBudget: number;
  // initial Bid Price abv or below flor price in % or ETH
  initialBidPriceInETH?: number;
  initialBidPriceInBPS?: number;
  // if we’re out-bid.. if we are, we will keep bidding 0.001 above previous bidder until we reach outBidThreshold
  outBidThresholdInETH?: number;
  outBidThresholdInBPS?: number;
  // Bid duration in seconds
  bidDuration: number;
  // List price
  listPriceInETH?: number;
  listPriceInBPS?: number;
}
