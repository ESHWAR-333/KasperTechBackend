const mongoose=require('mongoose')

module.exports = mongoose.model('Registartion',{
firstName:{type:String},
lastName:{type:String},
email:{type:String},
password:{type:String}
},'KasperTech_Registration'
)