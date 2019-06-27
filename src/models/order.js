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
    jobLocation:{
        type:String,
        default:' ',
    },
    grade:{
        type:Number,        
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
    
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
    } 
  );
 
  schema.statics.searchQuery = async function (searchType, Key, page, pageSize, sort) {
    
    const query= this.find();   
             
    if ( searchType==="customer") {
            query.populate({
            path: 'customer',
            match: { customerName: new RegExp(Key,'i')},
            select: 'customerName', 
            });          
            query.select('customer business  category status grade comments');
            query.skip((page-1)*pageSize);
            query.limit(pageSize);             
    } ;
    if ( searchType==="business") {
        query.populate({
        path: 'business',
        match: { businessName: new RegExp(Key,'i')},     
        });
        query.select('customer business  category status grade comments');
        query.skip(page-1)*pageSize;
        query.limit(pageSize);             
} ;
   
    sort ? query.sort(sort) :  query;
    return query.exec();
}

const model = mongoose.model('Order', schema);

module.exports = model;