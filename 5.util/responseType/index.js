

const responseTypes=(status)=>{
    switch (status) {
        case 200:
            return{
                code:200,
                message:"successfully fetch API"
            }
        case 201:
            return{
                code:201,
                message:"successfully created data"
            }
        case 500:
            return{
                code:500,
                message:"internal server error"
            }
        case 404:
            return{
                code:404,
                message:"notfound"
            }
        case 401:
            return{
                code:401,
                message:"Authentication Error !"
            }
    
        default:
            return status
    }
}

module.exports = responseTypes