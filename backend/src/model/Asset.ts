import { Schema, Types, model, Model } from 'mongoose';
import { IAsset } from '../types';

// An interface that describes what attributes a asset model should have
interface AssetModel extends Model<IAsset> {
  build(attrs: IAsset): IAsset;
}

// Creating asset schema
const AssetSchema = new Schema<IAsset, AssetModel>(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    assetContract: {
      type: String,
      required: true,
    },
    last_sale: {
      type: String,
      default: null,
    },
    traits: {
      type: [String],
      required: true,
    },
    tokenId: {
      type: Number,
      required: true,
    },
    monitored: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
      versionKey: false,
    },
    timestamps: true,
  }
);

// Statics
AssetSchema.statics.build = (attrs: IAsset) => {
  return new Asset(attrs);
};

// Creating asset model
const Asset = model<IAsset>('Asset', AssetSchema);

export { Asset };
