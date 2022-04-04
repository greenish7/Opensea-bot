import { zeroXMNIWrapper } from './core';

const Main = async () => {
  console.info(`- - -`.repeat(10));
  console.log(`Starting...`);
  console.info(`- - -`.repeat(10));
  await zeroXMNIWrapper.start();
};
