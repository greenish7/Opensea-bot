import { Schema, Types, model, Model } from 'mongoose';
import { ICollection } from '../types';

// An interface that describes what attributes a collection model should have
interface CollectionModel extends Model<ICollection> {
  build(attrs: ICollection): ICollection;
}

// Creating collection schema
const CollectionSchema = new Schema<ICollection, CollectionModel>(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
      default: '',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: '',
    },
    traits: {
      type: [String],
    },
    addedBy: {
      type: Types.ObjectId,
      ref: 'User',
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
CollectionSchema.statics.build = (attrs: ICollection) => {
  return new Collection(attrs);
};

// Creating collection model
const Collection = model<ICollection>('Collection', CollectionSchema);

export { Collection };
