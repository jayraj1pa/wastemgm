import axios from "axios";

export const commonAPI = async (httpRequest,url,reqBody,reqHeader)=>{
    const reqConfig = {
        method:httpRequest,
        url,
        data:reqBody,
        headers:reqHeader?reqHeader:{"contenty-type":"application/json"}
    }
    return await axios(reqConfig).then(
        (result)=>{
            return result
        }
    ).catch((error)=>{
        return error
    
})
}