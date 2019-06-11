const mongoose = require('mongoose');

schema = new mongoose.Schema({
    businessName :{
        type:String,
        required:true
    },
    ABN: {
        type:Number,  
        // required:true,
        default:''      
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        // required:true,
        default:"000000",
    },
    streeAddress:{
        type:String,
        // required:true,
        default:''
    },
    postcode:{
        type:Number,
        required:true
    },
    state:{
        type:String,
        // required:true,
        default:'QLD',
        enum: ['NSW', 'VIC', 'QLD', 'WA', 'TAS','SA','ACT', 'NT'], 
    },
    categroies:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Categroy'
    }],
    bookings:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
    }]
});

const model = mongoose.model('Business', schema);

module.exports = model;