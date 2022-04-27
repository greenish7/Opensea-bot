import { Schema, model, Model } from 'mongoose';
import { IUser } from '../types';
type IGlobal = {
  user?: IUser;
  totalBudget?: number;
  budgetStartDate?: Date;
  budgetEndDate?: Date;
};

// An interface that describes what attributes a user model should have
interface GlobalModel extends Model<IGlobal> {
  build(attrs: IGlobal): IGlobal;
}

// Creating user schema
const GlobalSchema = new Schema<IGlobal, GlobalModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    totalBudget: {
      type: Number,
      default: 0,
    },
    budgetStartDate: {
      type: Date,
      default: Date.now,
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
GlobalSchema.pre('save', function (next) {
  if (this.isNew) {
    let date = new Date();
    date.setDate(date.getDate() + 7);
    this.budgetStartDate = date;
  }
  next();
});

// Statics
GlobalSchema.statics.build = (attrs: IGlobal) => {
  return new Global(attrs);
};

// Methods
GlobalSchema.methods.timeframeExpired = function (): number {
  return this.budgetEndDate.getTime() - Date.now();
};

// Creating user model
const Global = model<IGlobal>('Global', GlobalSchema);

export { Global };
