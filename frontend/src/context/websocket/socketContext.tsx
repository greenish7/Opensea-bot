import { createContext } from "react";
import { Socket } from "socket.io-client";

type ISocketContext = {
  socket: Socket | null;
  socketId: string | null;

  cleanUp: () => void;
};
const defaultValue = {
  socket: null,
  socketId: null,

  cleanUp: () => {},
};
export const SocketContext = createContext<ISocketContext>(defaultValue);
