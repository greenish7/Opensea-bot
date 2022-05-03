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
};

export const GlobalContext = createContext<IGlobalContext>(defaultValue);
