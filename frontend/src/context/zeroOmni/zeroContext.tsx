import { createContext } from "react";
import { IAsset, ICollection } from "../../types";

type IZeroContext = {
  collections: ICollection[];
  assets: IAsset[];
  myCollections: ICollection[];
  messages: string[];
  searchCollectionValue: string;
  selectedCollection: ICollection | null;
  selectedAssets: Map<number, IAsset>;
  searchCollection: (name: any) => void;
  fetchCollectionAssets: (payload: {
    count: number;
    collection: string;
  }) => void;
  fetchMyCollections: () => void;
  setSearchCollectionValue: (value: string) => void;
  setSelectedCollection: (collection: ICollection) => void;
  setSelectedAssets: (assets: Map<number, IAsset>) => void;
};
const defaultValue = {
  collections: [],
  myCollections: [],
  assets: [],
  messages: [],
  searchCollectionValue: "",
  selectedCollection: null,
  selectedAssets: new Map(),

  searchCollection: async (name: string) => {},
  fetchCollectionAssets: async (payload: {
    count: number;
    collection: string;
  }) => {},
  fetchMyCollections: async () => {},
  setSearchCollectionValue: (value: string) => {},
  setSelectedCollection: (collection: ICollection) => {},
  setSelectedAssets: (assets: Map<number, IAsset>) => {},
};

export const ZeroContext = createContext<IZeroContext>(defaultValue);
