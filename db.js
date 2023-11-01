const mongoose=require('mongoose')

const dbUri='mongodb+srv://root:root123@atlascluster.mvc3o7d.mongodb.net/KasperTech_db?retryWrites=true&w=majority'



module.exports=()=>{
    return mongoose.connect(dbUri);
}