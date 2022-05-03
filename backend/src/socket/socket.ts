import { sign, verify } from 'jsonwebtoken';
import { Socket, Event, Server } from 'socket.io';
import { ActionType } from '../common';

import { config } from '../config';
import { getUserById, getCollections } from '../controller';
import { ICollection, IUser } from '../types';

// Init users
const users: Record<string, IUser> = {};

export const init = (socket: Socket, io: Server) => {
  socket.on(ActionType.FETCH_COLLECTIONS_INFO, async (token: string) => {
    let user: any;

    verify(token, config.JWT_SECRET, (err, decoded: any) => {
      if (err) {
        console.error(err);
        return;
      }

      user = decoded.user;
    });

    if (user) {
      const found = Object.values(users).find((user) => user.id === user.id);

      if (found) {
        delete users[found.socketId!];
      }
      user = await getUserById(user.id);

      users[socket.id] = user;

      const collections = getCollections(user.id);

      socket.emit(ActionType.FETCH_COLLECTIONS_INFO, {
        collections,
        users,
        socketId: socket.id,
      });
    }
  });
  socket.on(ActionType.DISCONNECT, async () => {
    delete users[socket.id];

    console.info(`User ${socket.id} disconnected`);
  });
};
