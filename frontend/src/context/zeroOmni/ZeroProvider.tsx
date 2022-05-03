import { useContext, useEffect, useState } from "react";
import { useOpenSea } from "../../hooks";
import { ActionType, IAsset, ICollection } from "../../types";
import { GlobalContext } from "../global";
import { SocketContext } from "../websocket";
import { ZeroContext } from "./zeroContext";

export const ZeroProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const { socket } = useContext(SocketContext);
  const { setIsLoading } = useContext(GlobalContext);
  const [messages, setMessages] = useState<string[]>([]);
  const [searchCollectionValue, setSearchCollectionValue] =
    useState<string>("");
  const [myCollections, setMyCollections] = useState<ICollection[]>([]);
  const [assets, setAssets] = useState<IAsset[]>([]);
  const [selectedCollection, setSelectedCollection] =
    useState<ICollection | null>(null);
  const [selectedAssets, setSelectedAssets] = useState<Map<number, IAsset>>(
    new Map()
  );
  const { collections, searchCollection } = useOpenSea();

  useEffect(() => {
    if (socket) {
      // window.addEventListener('unload', leaveTable);
      // window.addEventListener('close', leaveTable);

      socket.on(ActionType.SOME_ERROR, (data: { message: string }) => {
        setIsLoading(false);
        console.log(ActionType.SOME_ERROR, data);
        data?.message && addMessage(data.message);
      });

      socket.on(
        ActionType.RECEIVE_COLLECTIONS_INFO,
        (data: { data: ICollection[] }) => {
          setIsLoading(false);
          console.log(ActionType.RECEIVE_COLLECTIONS_INFO, data);
          data?.data && setMyCollections(data.data);
        }
      );
      socket.on(
        ActionType.RECEIVE_COLLECTION_ASSETS,
        (data: { data: IAsset[] }) => {
          setIsLoading(false);
          console.log(ActionType.RECEIVE_COLLECTION_ASSETS, data);
          data?.data && setAssets(data.data);
        }
      );
    }
    // return () => leaveTable();
    // eslint-disable-next-line
  }, [socket]);

  const fetchMyCollections = async () => {
    setIsLoading(true);
    console.log(ActionType.FETCH_COLLECTIONS_INFO, "");
    socket?.emit(ActionType.FETCH_COLLECTIONS_INFO);
  };
  const fetchCollectionAssets = async (payload: {
    count: number;
    collection: string;
  }) => {
    setIsLoading(true);
    const { count, collection } = payload;
    console.log(ActionType.FETCH_COLLECTION_ASSETS, payload);
    count &&
      collection &&
      socket?.emit(ActionType.FETCH_COLLECTION_ASSETS, payload);
  };

  const addMessage = (message: string, from?: string) => {
    setMessages((messages) => [...messages, message]);
    console.log({ message, from });
  };
  return (
    <ZeroContext.Provider
      value={{
        messages,
        myCollections,
        collections,
        assets,
        searchCollection,
        searchCollectionValue,
        setSearchCollectionValue,
        fetchMyCollections,
        selectedCollection,
        setSelectedCollection,
        fetchCollectionAssets,
        selectedAssets,
        setSelectedAssets,
      }}
    >
      {children}
    </ZeroContext.Provider>
  );
};
