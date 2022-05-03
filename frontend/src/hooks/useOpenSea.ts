import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { config } from "../config";
import { GlobalContext } from "../context";

export const useOpenSea = () => {
  const [collections, setCollections] = useState<any>([]);
  const [assets, setAssets] = useState<any>([]);
  const { setIsLoading } = useContext(GlobalContext);

  const searchAsset = async (name: string) => {
    setIsLoading(true);
    const { data } = await config.axios.get(`/api/assets/search?name=${name}`);
    setIsLoading(false);
    setAssets(data);
  };

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

  return {
    collections,
    assets,
    searchAsset,
    searchCollection,
  };
};
