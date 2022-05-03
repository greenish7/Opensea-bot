import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { config } from "../config";
import { GlobalContext } from "../context";
// import { WyvernSchemaName } from "opensea-js/lib/types";
// import { OpenSeaPort, Network } from "opensea-js";
import { providers } from "ethers";

export const useOpenSea = () => {
  const [collections, setCollections] = useState<any>([]);
  // const [assets, setAssets] = useState<any>([]);
  const { setIsLoading, getProviderOrSigner } = useContext(GlobalContext);

  const searchCollection = async (slug: string) => {
    setIsLoading(true);
    try {
      const { data } = await axios({
        method: "get",
        url: `/collection/${slug}`,
        baseURL: config.REACT_APP_OPENSEA_API_BASE_URL,
      });
      console.log(data);
      setCollections([data?.collection] || []);
    } catch (error: any) {
      let err = JSON.parse(JSON.stringify(error));
      let msg = err.message;
      toast(msg);
    }
    setIsLoading(false);
  };
  const makeOffer = async (
    tokenId: string,
    tokenAddress: string,
    startAmount: number,
    // schemaName: WyvernSchemaName = WyvernSchemaName.ERC721,
    expirationTime: number = Math.round(Date.now() / 1000 + 60 * 60 * 24) // One day from now
  ) => {
    try {
      setIsLoading(true);
      const asset = {
        tokenId,
        tokenAddress,
        // schemaName,
      };

      const signer = (await getProviderOrSigner(
        true
      )) as providers.JsonRpcSigner;
      if (signer) {
        const accountAddress = await signer.getAddress();
        const web3: any = new providers.Web3Provider(window.ethereum);
        // const client = new OpenSeaPort(web3.provider, {
        // networkName: Network.Main,
        // apiKey: config.REACT_APP_OPENSEA_API_KEY,
        // });
        // const offer = await client.createBuyOrder({
        // asset,
        // accountAddress,
        // startAmount,
        // expirationTime,
        // });
        // console.log(offer);
        toast.success("Offer created");
      } else {
        toast("Please connect to MetaMask");
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error);
    }
  };

  return {
    collections,
    searchCollection,
    makeOffer,
  };
};
