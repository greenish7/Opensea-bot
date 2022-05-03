import axios from 'axios';
import { config } from '../../../config';
import { OpenSeaPort, Network } from 'opensea-js';
import * as Web3 from 'web3';
import { WyvernSchemaName } from 'opensea-js/lib/types';

/// @dev sleep function
export const sleep = async (ms: number) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * @title OpenSea
 * @description OpenSea is a wrapper for the OpenSea API.
 * @author [dennohpeter]
 * @license Apache-2.0
 * @version 1.0.0
 *
 */
class OpenSea {
  baseurl: string;
  client: OpenSeaPort;
  network: Network;

  constructor() {
    this.baseurl = 'https://api.opensea.io/api/v1';
    this.network = config.TEST_NETWORK ? Network.Rinkeby : Network.Main;
    let provider = new Web3.default.providers.HttpProvider(
      //   config.PRIVATE_KEY.startsWith('0x')
      //     ? config.PRIVATE_KEY
      //     : `0x${config.PRIVATE_KEY}`,
      // ],
      config.TEST_NETWORK
        ? 'https://rinkeby.infura.io/v3/' + config.INFURA_API_KEY
        : 'https://mainnet.infura.io/v3/' + config.INFURA_API_KEY
    );

    this.client = new OpenSeaPort(provider, {
      networkName: this.network,
      apiKey: config.OPENSEA_API_KEY,
    });
  }

  /**
   * @description Get a collection by url
   * @param url The url of the collection
   */
  getCollection = async (url: string) => {
    /// @dev validate url
    if (!url) {
      throw new Error('url is required');
    }
    console.log({
      url,
    });

    try {
      const slug = url.split('/').pop();
      const { data } = await axios({
        method: 'GET',
        url: `${this.baseurl}/collection/${slug}`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // 'X-API-KEY': config.OPENSEA_API_KEY,
        },
      });
      console.log({ data });
      return data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  /**
   * @description Get collections
   * @param page The page number
   * @param per_page The number of items per page
   */
  getCollections = async (page = 0, per_page = 300, asset_owner?: string) => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${this.baseurl}/collections`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-API-KEY': config.OPENSEA_API_KEY,
        },
        params: {
          page,
          per_page,
          asset_owner,
        },
      });
      return data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  /**
   * @description makes an offer on an asset in the OpenSea marketplace
   * @param tokenId The tokenId of the asset
   * @param tokenAddress The address of the token
   * @param startAmount The amount of the asset to start with
   * @param accountAddress The address of the account making the offer
   * @param schemaName The schema name of the asset
   * @returns The offer
   */

  makeOffer = async (
    tokenId: string,
    tokenAddress: string,
    startAmount: number,
    accountAddress: string = config.PUBLIC_KEY,
    schemaName: WyvernSchemaName = WyvernSchemaName.ERC721,
    expirationTime: number = Math.round(Date.now() / 1000 + 60 * 60 * 24) // One day from now
  ) => {
    try {
      const asset = {
        tokenId,
        tokenAddress,
        schemaName,
      };
      const offer = await this.client.createBuyOrder({
        asset,
        accountAddress,
        startAmount,
        expirationTime,
      });
      return offer;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  /**
   * @description Get offers for an asset
   * @param tokenId The tokenId of the asset
   * @param tokenAddress The address of the token
   * @param limit The number of offers to return
   */
  getOffers = async (tokenId: string, tokenAddress: string, limit = 50) => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${this.baseurl}/asset/${tokenAddress}/${tokenId}/offers`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // 'X-API-KEY': config.OPENSEA_API_KEY,
        },
        params: {
          limit,
        },
      });
      console.log({ data });
      return data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  /**
   * @description Get an asset by tokenId and tokenAddress
   * @param params.tokenId The tokenId of the asset
   * @param params.tokenAddress The address of the token
   */
  getAsset = async (params: {
    tokenId: string | number;
    tokenAddress: string;
  }) => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${this.baseurl}/asset/${params.tokenAddress}/${params.tokenId}`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-API-KEY': config.OPENSEA_API_KEY,
        },
      });
      console.log({ data });
      return data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  /**
   * @description Get assets
   * @param page The page number
   * @param per_page The number of items per page
   */
  getAssets = async (tokenAddress: string, page = 0, per_page = 1) => {
    try {
      let assets: Array<any> = [];
      // for (let tokenId = 0; tokenId < per_page; tokenId++) {
      //   try {
      //     let results = await this.getAsset({
      //       tokenAddress,
      //       tokenId:
      //         '66406747123743156841746366950152533278033835913591691491127082341586364792833',
      //     });

      //     assets = [...assets, results];
      //     await sleep(10_000);
      //   } catch (err) {
      //     console.log(err);
      //   }
      // }
      const { data } = await axios({
        method: 'GET',
        url: `${this.baseurl}/assets`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-API-KEY': config.OPENSEA_API_KEY,
        },
        params: {
          collection: 'lvcidiaavatars',
        },
      });

      return data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };
}

export const openSeaWrapper = new OpenSea();
