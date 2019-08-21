const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schema = new mongoose.Schema({
  customerName: {
    type: String,
    trim: true,
    required: true
  },
  preferName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: email => !Joi.validate(email, Joi.string().email()).error,
      msg: 'Invalid email format'
    }
  },
  phone: {
    type: Number,
    required: true
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking'
    }
  ]
});

schema.statics.searchQuery = async function(key, page, pageSize, sort) {
 
    const query =this.find({'customerName':new RegExp(key,'i')});
  query.skip((page - 1) * pageSize);
  query.limit(pageSize);
  sort ? query.sort(sort) : query;
  return query.exec();
};

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

const model = mongoose.model('Customer', schema);

module.exports = model;
