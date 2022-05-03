import { Collection } from '../model';
import { ICollection } from '../types';

export const getCollections = (userId?: string) => {
  return Collection.find();
};
