import { useState, useEffect } from "react";
import { SocketContext } from "./socketContext";
import { io, Socket } from "socket.io-client";
import { ActionType, ICollection } from "../../types";

import { config } from "../../config";

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  // const { isLoggedIn } = useContext(AuthContext);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [socketId, setSocketId] = useState<null | string>(null);

  useEffect(() => {
    window.addEventListener("beforeunload", cleanUp);
    window.addEventListener("beforeClose", cleanUp);

    return () => cleanUp();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // if (isLoggedIn) {
    // const token = localStorage.getItem('token');
    // const _webSocket = connect();
    connect();

    // token && webSocket && webSocket.emit(ActionType.FETCH_LOBBY_INFO, token);
    // } else {
    // cleanUp();
    // }

    return () => cleanUp();
    // eslint-disable-next-line
  }, []);

  function cleanUp() {
    console.log("cleanup");
    window.socket && window.socket.close();
    setSocket(null);
    setSocketId(null);
  }

  function connect() {
    console.log("connect");
    const webSocket = io(config.REACT_APP_SOCKET_URL, {
      transports: ["websocket"],
      upgrade: false,
    });
    registerCallbacks(webSocket);
    setSocket(webSocket);
    window.socket = webSocket;
    return webSocket;
  }

  function registerCallbacks(socket: Socket) {
    socket.on(
      ActionType.RECEIVE_COLLECTIONS_INFO,
      (data: { data: ICollection[] }) => {
        console.log(ActionType.RECEIVE_COLLECTIONS_INFO, data, socketId);
      }
    );
    // socket.on(ActionType.PLAYERS_UPDATED, (data: { players: IPlayer[] }) => {
    //   console.log(ActionType.PLAYERS_UPDATED, data.players);
    //   setPlayers(data.players);
    // });
    // socket.on(ActionType.TABLES_UPDATED, (data: { tables: ITable[] }) => {
    //   console.log(ActionType.TABLES_UPDATED, data.tables);
    //   setTables(data.tables);
    // });
  }

  return (
    <SocketContext.Provider
      value={{
        socket,
        socketId,
        cleanUp,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
