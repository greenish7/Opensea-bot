import 'dotenv/config';

export const config = {
  /**
   * @description The OpenSea API key
   */
  OPENSEA_API_KEY: process.env.OPENSEA_API_KEY,

  /**
   * @description Test network
   */
  TEST_NETWORK: true,

  /**
   * @description Infura API key
   * @see https://infura.io/
   */
  INFURA_API_KEY: process.env.INFURA_API_KEY,
};
