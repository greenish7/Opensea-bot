/// @dev Handles the Business Logic for the bot

class ZeroXMNI {
  private baseurl: string;

  constructor() {
    this.baseurl = 'https://api.opensea.io/api/v1';
  }

  /**
   * Start the bot
   */
  start = async () => {};
}

export const zeroXMNIWrapper = new ZeroXMNI();
