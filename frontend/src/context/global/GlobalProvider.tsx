import { useState } from "react";
import { ICollection } from "../../types";
import { GlobalContext } from "./globalContext";

export const GlobalProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState<string | null>(null);
  const [selectedWallet] = useState<string>(
    localStorage?.getItem("selectedWallet") || "backend"
  );
  const [userName, setUserName] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [collections, setCollections] = useState<ICollection[]>([]);

  const setSelectedWallet = (value: string) => {
    localStorage.setItem("selectedWallet", value);
  };

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        setIsLoading,
        id,
        setId,
        userName,
        setUserName,
        address,
        setAddress,
        collections,
        setCollections,
        selectedWallet,
        setSelectedWallet,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
