import { providers } from "ethers";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { config } from "../../config";
import { ICollection } from "../../types";
import { GlobalContext } from "./globalContext";
import Web3Modal from "web3modal";

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
  const web3ModalRef = useRef();

  const [collections, setCollections] = useState<ICollection[]>([]);
  useEffect(() => {
    (web3ModalRef.current as any) = new Web3Modal({
      network: "rinkeby",
      providerOptions: {},
      disableInjectedProvider: false,
    });
  }, []);

  const setSelectedWallet = (value: string) => {
    localStorage.setItem("selectedWallet", value);
  };
  const getProviderOrSigner = async (needSigner = false) => {
    const conn_wallet = await (web3ModalRef.current as any).connect();

    const provider = new providers.Web3Provider(conn_wallet);

    const { chainId } = await provider.getNetwork();
    if (!config.REACT_APP_SUPPORTED_CHAIN_IDS.includes(chainId)) {
      toast.warn("Change network to Rinkeby testnet");
      return null;
    }

    if (needSigner) {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      if (signer) {
        return signer;
      }
      toast.error("You need to allow MetaMask.");
      return null;
    }

    return provider;
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
        getProviderOrSigner,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
