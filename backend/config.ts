import 'dotenv/config';

if (
  !process.env.PRIVATE_KEY ||
  !process.env.OPENSEA_API_KEY ||
  !process.env.INFURA_API_KEY ||
  !process.env.PUBLIC_KEY
) {
  throw new Error(
    'Please set the following environment variables: PRIVATE_KEY, OPENSEA_API_KEY, INFURA_API_KEY, PUBLIC_KEY'
  );
}

export const config = {
  /**
   * @description The OpenSea API key
   */
  OPENSEA_API_KEY: process.env.OPENSEA_API_KEY!,

  /**
   * @description Test network
   */
  TEST_NETWORK: true,

  /**
   * @description Infura API key
   * @see https://infura.io/
   */
  INFURA_API_KEY: process.env.INFURA_API_KEY,

  /**
   * @description Account config
   */
  PRIVATE_KEY: process.env.PRIVATE_KEY!,
  PUBLIC_KEY: process.env.PUBLIC_KEY!,
};
