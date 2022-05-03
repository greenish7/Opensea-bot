import { Socket, Server } from 'socket.io';
import { ActionType } from '../common';

import { openSeaWrapper } from '../core';
import { getCollections } from '../controller';

export const init = (socket: Socket, io: Server) => {
  console.log('Socket connected', socket.id);
  socket.on(ActionType.FETCH_COLLECTIONS_INFO, async (token?: string) => {
    socket.emit(ActionType.RECEIVE_COLLECTIONS_INFO, {
      data: await getCollections(),
    });
  });
  socket.on(
    ActionType.FETCH_COLLECTION_ASSETS,
    async (payload: { count: number; collection: string }) => {
      const { count, collection } = payload;
      console.log(`Fetching ${count} assets from ${collection}`);
      if (count && collection) {
        socket.emit(ActionType.RECEIVE_COLLECTION_ASSETS, {
          data: await openSeaWrapper.getAssets({
            count,
            collection,
            limit: 50,
          }),
        });
      } else {
        socket.emit(ActionType.SOME_ERROR, {
          message: 'Missing params, please provide both count and collection',
        });
      }
    }
  );
};
