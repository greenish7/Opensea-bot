import { providers } from "ethers";
import { createContext } from "react";
import { ICollection } from "../../types";

type IGlobalContext = {
  isLoading: boolean;
  selectedWallet: string;
  setIsLoading: (value: boolean) => void;
  id: string | null;
  setId: (value: string | null) => void;
  userName: string | null;
  setUserName: (value: string | null) => void;
  address: string | null;
  setAddress: (value: string | null) => void;
  collections: ICollection[];
  setCollections: (value: any[]) => void;
  setSelectedWallet: (value: string) => void;
  getProviderOrSigner: (
    value: boolean
  ) => Promise<providers.JsonRpcSigner | providers.Web3Provider | null>;
};

const defaultValue = {
  isLoading: true,
  id: null,
  userName: null,
  address: null,
  collections: [],
  selectedWallet: "backend",

  setIsLoading: (value: boolean) => {},
  setId: (value: string | null) => {},
  setUserName: (value: string | null) => {},
  setAddress: (value: string | null) => {},
  setCollections: (value: ICollection[]) => {},
  setSelectedWallet: (value: string) => {},
  getProviderOrSigner: (value: boolean) => Promise.resolve(null),
};

export const GlobalContext = createContext<IGlobalContext>(defaultValue);
