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
// admin user view
export const alladminUsers = async (reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/admin/UsersView`,"",reqHeader)
}

// add-Community
export const adminAddCommunity = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/admin/community`,reqBody,reqHeader)
}

// view-community
export const viewCommunity = async(reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/all/community`,{},reqHeader)
 
}


//addProducts
export const adminAddProducts =  async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/admin/products`,reqBody,reqHeader)
}


// view-products
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
export const editReportAPI = async(reportId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${BASE_URL}/report/edit/${reportId}`,reqBody,reqHeader)
}


// edit scheduling API
export const editSchedulingAPI = async(scheduleId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${BASE_URL}/schedule/edit/${scheduleId}`,reqBody,reqHeader)
}





// delete schedule
export const deleteScheduleAPI = async(scheduleId,reqHeader)=>{
    return await commonAPI("DELETE",`${BASE_URL}/delete/schedule/${scheduleId}`,{},reqHeader)

} 


// delete schedule
export const deleteCommunityAPI = async(scheduleId,reqHeader)=>{
    return await commonAPI("DELETE",`${BASE_URL}/delete/community/${scheduleId}`,{},reqHeader)

} 



export const deleteProductAPI = async(scheduleId,reqHeader)=>{
    return await commonAPI("DELETE",`${BASE_URL}/delete/product/${scheduleId}`,{},reqHeader)

}


// update Report admin
export const updateReportStatus = async (reportId, newStatus, reqHeader) => {
    return await commonAPI("PUT", `${BASE_URL}/admin/reports/update-status`, { reportId, status: newStatus }, reqHeader);
};


// update Schedule admin
export const updateScheduleStatus = async (scheduleId, newStatus, reqHeader) => {
    return await commonAPI("PUT", `${BASE_URL}/admin/schedule/update-status`, { scheduleId, status: newStatus }, reqHeader);
};


// update community
export const updateCommunityJoin = async (id, status, reqHeader) => {
    return await commonAPI("PUT", `${BASE_URL}/community/update-status`, { id, status: status }, reqHeader);
};


// feedback user
export const feedbackAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/sumbit/feedback`,reqBody,reqHeader)
}


// admin feedback
export const viewfeedback = async (reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/admin/viewfeedback`,reqHeader)
}


// get Coins
export const coinsApi = async(reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/coins`,{},reqHeader)
}

export const checkoutAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/checkout`,reqBody,reqHeader)
}

export const checkoutAPIAdmin = async(reqBody)=>{
    return await commonAPI("GET",`${BASE_URL}/admin/checkout`,{},reqBody)
}