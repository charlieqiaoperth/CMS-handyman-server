const mongoose = require('mongoose');

schema= new mongoose.Schema({
    customer :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer', 
        required:true       
    },
    business:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Business',
        required:true 
    },
    category:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category',
        required:true 
    },
    status:{
        type:String,
        // required:true,
        enum:['booking', 'accepted', 'finished'],
        default:'booking'
    },
    timeRecord:[{
        type:Date,
    }],
    // acceptedTime:{
    //     type:Date,        
    // },
    // finishedTime:{
    //     type:Date,        
    // },
    jobLocation:{
        type:String,
        default:' ',
    },
    grade:{
        type:String,        
        enum:[0, 1, 2, 3, 4, 5],
        default:0
    },
    comments:{
        type:String,              
        default:''
    }, 
    __v:{type:Number,select:false}, 
   },
    {
    // timestamps:true,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
    } 
  );
 
const model = mongoose.model('Order', schema);

module.exports = model;