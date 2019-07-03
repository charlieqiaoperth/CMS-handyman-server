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
 
  schema.statics.searchQuery = async function (searchType, key, page, pageSize, sort) {
    
    let query= this.find();   
             
    if ( searchType==="customer") {
            query.populate({
            path: 'customer',
            select: 'customerName', 
            // match: { customerName: "john"},      //new RegExp(key,'i')  
            
            });
            query.populate({
                path: 'business',                
                select: 'businessName', 
                }); 
            query.populate({
            path: 'category',                
            select: 'name', 
            });
            // query.find({"customer.customerName":new RegExp(key,'i')})
            // query.find({customer:{customerName:"john"}});
            // query.find({"customer":"john" });
            // query.where('customer').$ne(null);
            // query.{customer:{ $ne: null } }
            query.select('customer business  category status grade comments');
            query.skip((page-1)*pageSize);
            query.limit(pageSize);             
    } ;
    if ( searchType==="business") {
        query.populate({
        path: 'business',
        match: { businessName: new RegExp(key,'i')},  
        select: 'businessName',    
        });
        query.populate({
            path: 'customer',                
            select: 'customerName', 
            }); 
        query.populate({
        path: 'category',                
        select: 'name', 
        });
        // query.match({customer:{ $ne: null }}),
        query.select('customer business  category status grade comments');
        query.skip(page-1)*pageSize;
        query.limit(pageSize);             
} ;
    
    sort ? query.sort(sort) :  query;
    
    return query.exec();
  

// const aggregate =[
//     {
//         $lookup:
//       {
//         from: "Customer",
//         localField: "customer",
//         foreignField: "_id",
//         as: "customerAll"
//       }
//     },
//     {
//         $project:
//         {
//             customerAll:1,
//             business:1,
//             status:1,
//             customer:1
//         }
//     }
// ];
// return this.aggregate(aggregate);

}

const model = mongoose.model('Order', schema);

module.exports = model;