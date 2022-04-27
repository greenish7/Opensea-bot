/// @dev Handles the Business Logic for the bot
import { openSeaWrapper } from './opensea';
class ZeroXMNI {
  private baseurl: string;
  private collections: string[];

  constructor() {
    this.baseurl = 'https://api.opensea.io/api/v1';
    this.collections = ['https://opensea.io/collection/lvcidiaavatars'];
  }

  /**
   * Start the bot
   */
  start = async () => {
    /// @dev Get the list of all the assets in a collection
    // for (let i = 0; i < this.collections.length; i++) {
    //   const collection = this.collections[i];

    //   try {
    //     const _collection = await openSeaWrapper.getCollection(collection);

    //     console.log({
    //       primary_asset_contracts:
    //         _collection.collection.primary_asset_contracts,
    //       stats: _collection.collection.stats,
    //     });

    /// @dev Get the list of all the assets in a collection
    const assets = await openSeaWrapper.getAssets(
      `0x495f947276749Ce646f68AC8c248420045cb7b5e`
    );
    console.log({
      assets,
    });
    //     } catch (error) {}
    //   }
  };
}

export const zeroXMNIWrapper = new ZeroXMNI();
