const isAunthenticate = (req, res, next) => {
    if(localStorage.getItem("token") === undefined || localStorage.getItem("token") === null){
        next();
    }else{
        error = true;
        error_msg = "NEl Prro v:";
        this.$router.push('/');
    }
}
module.exports = isAunthenticate;