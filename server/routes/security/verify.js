const {tokenchecker} = require("./token");

module.exports = async function(req,res,next){
    try{
    const jwt = req.cookies.jwt;
    const token = await tokenchecker(jwt);
    console.log(token)
    if(token){
        next();
    }
    else{
        res.send("Access Denied");
    }
}catch(err)
{
  res.send("Access Denied");
}

}