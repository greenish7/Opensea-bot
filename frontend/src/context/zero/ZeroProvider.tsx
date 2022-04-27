import { useOpenSea } from "../../hooks";
import { ZeroContext } from "./zeroContext";

export const ZeroProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const { collections, assets, searchCollection, searchAsset } = useOpenSea();

  return (
    <ZeroContext.Provider
      value={{
        collections,
        assets,
        searchCollection,
        searchAsset,
      }}
    >
      {children}
    </ZeroContext.Provider>
  );
};
