module.exports= (req,res,next) =>{
    if(res.locals.usuario.roles == 9){
        return next();
    }else{
        res.redirect('/') 
    }
}