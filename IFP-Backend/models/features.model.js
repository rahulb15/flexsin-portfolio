import { Schema, model } from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');


const FeaturesSchema = new Schema({
  name: {
    type: String,
    required: true,
    default:""
  },
  register_date: {
    type: Date,
    default: Date.now
  },
}, {
  timestamps: true
},
);



FeaturesSchema.plugin(mongoosePaginate);
const Features = model('features', FeaturesSchema);
export default Features;
