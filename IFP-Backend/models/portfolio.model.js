import { Schema, model } from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');


const PortfolioSchema = new Schema({
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



PortfolioSchema.plugin(mongoosePaginate);
const Portfolio = model('portfolio', PortfolioSchema);
export default Portfolio;
