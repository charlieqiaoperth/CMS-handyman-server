const mongoose = require('mongoose');

  schema = new mongoose.Schema({
    name :{
        type:String,
        required:true,        
    },
    description: {
        type:String,       
        default:''
    },
    businesses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
    }]
  });

  const model = mongoose.model('Category', schema);

  module.exports = model;