const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schema = new mongoose.Schema({
    customerName :{
        type:String,
        trim:true,
        required:true
    },
    preferName: {
        type:String,
        default:''       
    },
    email:{
        type:String,
        required:true,
        validate: {
            validator: email => !Joi.validate(email, Joi.string().email()).error,
            msg: 'Invalid email format'
          }
    },
    phone:{
        type:Number,
        required:true
    },
    bookings:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
    }]
});


const model = mongoose.model('Customer', schema);

module.exports = model;