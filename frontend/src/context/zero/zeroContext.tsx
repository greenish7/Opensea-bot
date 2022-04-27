import { createContext } from "react";
import { ICollection } from "../../types";

type IZeroContext = {
  collections: ICollection[];
  assets: any[];

  searchCollection: (name: any) => void;
  searchAsset: (name: any) => void;
};
const defaultValue = {
  collections: [],
  assets: [],
  searchCollection: async (name: string) => {},
  searchAsset: async (name: string) => {},
};

export const ZeroContext = createContext<IZeroContext>(defaultValue);
