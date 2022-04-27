import { createContext } from "react";
import { ICollection } from "../../types";

type IGlobalContext = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  id: string | null;
  setId: (value: string | null) => void;
  userName: string | null;
  setUserName: (value: string | null) => void;
  address: string | null;
  setAddress: (value: string | null) => void;
  collections: ICollection[];
  setCollections: (value: any[]) => void;
};

const defaultValue = {
  isLoading: true,
  id: null,
  userName: null,
  address: null,
  collections: [],

  setIsLoading: (value: boolean) => {},
  setId: (value: string | null) => {},
  setUserName: (value: string | null) => {},
  setAddress: (value: string | null) => {},
  setCollections: (value: ICollection[]) => {},
};

export const GlobalContext = createContext<IGlobalContext>(defaultValue);
