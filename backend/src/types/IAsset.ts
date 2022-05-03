import { IConfig } from './IConfig';

export interface IAsset {
  tokenId: number;
  name: string;
  image: string;
  assetContract: string;
  description?: string;
  traits: string[];
  last_sale?: string | null;

  config?: IConfig;
}
