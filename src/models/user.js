const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");


const clientSchema = mongoose.Schema({
    name:{
		type:String,
		trim:true,
		tolowercase:true,
	},
	email:{
		type:String,
		index:{
			unique:true,
		},
		trim:true,
		tolowercase:true,
	},
    password:{
		type:String,
		required:true,
		minlength:6,
	}
},{
        timestamps:true,
    })


    clientSchema.pre("save", async function(next) {
        const user = this;
        if (this.password){
            const salt = bcryptjs.genSaltSync(12);
            const hash = await bcryptjs.hash(this.password,salt);
            user.password = hash;
            next();
        }else{
            next();
        }
        
    });
    

    clientSchema.methods.isValidated = async function(password)  {
        const user = this;
        const valid = await bcryptjs.compare(password,user.password);
        if (valid){
       
            userDb.findByIdAndUpdate(user.id,{lastLogin:Date.now()});
        }
        return valid;
    };


    const userDb = mongoose.model("villageCommissioner", clientSchema);
    module.exports =  userDb