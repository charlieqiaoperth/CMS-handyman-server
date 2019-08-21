const mongoose = require('mongoose');

schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    businesses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business'
      }
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
      }
    ]
  },
  {
    timestamps: true
  }
);

schema.statics.searchByQuery = async function(
  searchType,
  searchKeyword,
  pageRequested,
  pageSize,
  sortType,
  sortValue
) {
  pageSize = parseInt(pageSize);
  pageRequested = parseInt(pageRequested);
  sortValue = parseInt(sortValue);
  if (isNaN(pageSize) || pageSize <= 0) {
    return 'pageSize is invalid';
  }
  if (isNaN(pageRequested) || pageRequested <= 0) {
    return 'pageRequested is invalid';
  }
  if (sortValue !== 1 && sortValue !== -1) {
    return 'sortValue is invalid';
  }
  const data = await this.find({ [searchType]: new RegExp(searchKeyword, 'i') })
    .skip((pageRequested - 1) * pageSize)
    .limit(pageSize)
    .sort({ [sortType]: sortValue })
    .exec();

  return data;
};

const model = mongoose.model('Category', schema);

module.exports = model;
