import {BASE_URL} from './BaseUrl'
import { commonAPI } from './CommonAPI'


// register
export const registerAPI = async (user)=>{
    return await commonAPI("POST",`${BASE_URL}/user/register`,user,"")
}


// login
export const loginAPI = async (user)=>{
    return await commonAPI("POST",`${BASE_URL}/user/login`,user,"")
}

// wasteReporting
export const reportingAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/user/reporting`,reqBody,reqHeader)

}


// wasteScheduling
export const schedulingAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/user/scheduling`,reqBody,reqHeader)
}


// /user-view-wasteRequest
export const allRequest = async (reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/user/reportview`,"",reqHeader)
}

// user-view-wasteScheduling
export const allScheduling = async (reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/user/schedulingview`,"",reqHeader)
}

// admin-view-waste Reports
export const alladminReport = async (reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/admin/Reportview`,"",reqHeader)
}

// admin-view-Waste-Schedulings
export const alladminSchedulings = async (reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/admin/Scheduleview`,"",reqHeader)
  
}

export const alladminUsers = async (reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/admin/UsersView`,"",reqHeader)
}

// add-Community
export const adminAddCommunity = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/admin/community`,reqBody,reqHeader)
}

// view-community
export const viewCommunity = async()=>{
    return await commonAPI("GET",`${BASE_URL}/all/community`,"","")
 
}


//addProducts
export const adminAddProducts =  async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/admin/products`,reqBody,reqHeader)
}


// view-community
export const viewProducts = async()=>{
    return await commonAPI("GET",`${BASE_URL}/all/products`,"","")
 
}




// editProfileAPi
export const editProfileAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${BASE_URL}/user/profile`,reqBody,reqHeader)
}

export const deleteMyProfile = async(reqHeader)=>{
return await commonAPI("DELETE",`${BASE_URL}/account/delete`,{},reqHeader)
}

// delete reportApi
export const deleteReportAPI = async(reportId,reqHeader)=>{
    return await commonAPI("DELETE",`${BASE_URL}/delete/report/${reportId}`,{},reqHeader)

} 


// edit report API
export const editReportAPI = async (reportId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${BASE_URL}/edit/${reportId}`,reqBody,reqHeader)
}

// delete reportApi
export const deleteScheduleAPI = async(scheduleId,reqHeader)=>{
    return await commonAPI("DELETE",`${BASE_URL}/delete/schedule/${scheduleId}`,{},reqHeader)

} 





