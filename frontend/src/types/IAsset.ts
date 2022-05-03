export interface IAsset {
  id: number;
  num_sales: number;
  background_color: string | null;
  image_url: string | null;
  image_preview_url: string | null;
  image_thumbnail_url: string | null;
  image_original_url: string | null;
  animation_url: string | null;
  animation_original_url: string | null;
  name: string | null;
  description: string | null;
  external_link: string | null;
  asset_contract: AssetContract;
  permalink: string;
  collection: Collection;
  decimals: string | null;
  token_metadata: string | null;
  is_nsfw: boolean;
  owner: Owner;
  sell_orders: string | null;
  creator: string | null;
  traits: Record<string, any>[];
  last_sale: any;
  top_bid: string | null;
  listing_date: string | null;
  is_presale: boolean;
  transfer_fee_payment_token: string | null;
  transfer_fee: number | string | null;
  token_id: string;
}

export interface AssetContract {
  address: string;
  asset_contract_type: string;
  created_date: Date;
  name: string;
  nft_version: string;
  opensea_version: number | string | null;
  owner: number;
  schema_name: string;
  symbol: string;
  total_supply: string;
  description: string;
  external_link: string;
  image_url: string;
  default_to_fiat: boolean;
  dev_buyer_fee_basis_points: number;
  dev_seller_fee_basis_points: number;
  only_proxied_transfers: boolean;
  opensea_buyer_fee_basis_points: number;
  opensea_seller_fee_basis_points: number;
  buyer_fee_basis_points: number;
  seller_fee_basis_points: number;
  payout_address: string | null;
}

export interface Collection {
  banner_image_url: string;
  chat_url: string | null;
  created_date: Date;
  default_to_fiat: boolean;
  description: string;
  dev_buyer_fee_basis_points: string;
  dev_seller_fee_basis_points: string;
  discord_url: string;
  display_data: DisplayData;
  external_url: string;
  featured: boolean;
  featured_image_url: string | null;
  hidden: boolean;
  safelist_request_status: string;
  image_url: string;
  is_subject_to_whitelist: boolean;
  large_image_url: string | null;
  medium_username: string;
  name: string;
  only_proxied_transfers: boolean;
  opensea_buyer_fee_basis_points: string;
  opensea_seller_fee_basis_points: string;
  payout_address: string | null;
  require_email: boolean;
  short_description: string | null;
  slug: string;
  telegram_url: string;
  twitter_username: string | null;
  instagram_username: string;
  wiki_url: string | null;
  is_nsfw: boolean;
}

export interface DisplayData {
  card_display_style: string;
}

export interface Owner {
  user: User;
  profile_img_url: string;
  address: string;
  config: string;
}

export interface User {
  username: string;
}
