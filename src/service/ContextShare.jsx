import React, { createContext, useState } from 'react'
export const addReportResponseContext = createContext()
export const addScheduleResponseContext = createContext()
export const addPriceContext = createContext()
export const medalContext = createContext()
export const paymentContext = createContext()
export const schedulingData = createContext()

function ContextShare({children}) {
    const [addReportResponse,setAddReportResponse] = useState({})
    const [addScheduleResponse,setAddScheduleResponse] = useState({})
    const[payPrice,setPayPrice] = useState("")
    const [medal,setMedal] = useState("")
    const [payment,setPayment] = useState("")
    const [scheduleStatus,setScheduleStatus] = useState("")
    console.log('Schedule Status:', scheduleStatus); // Add this line
    console.log("india",payment);


  return (
<>

<addReportResponseContext.Provider value={{addReportResponse,setAddReportResponse}}>
    <addScheduleResponseContext.Provider value={{addScheduleResponse,setAddScheduleResponse}}>
      <addPriceContext.Provider value={{payPrice,setPayPrice}}>
        <medalContext.Provider value={{medal,setMedal}}>
          <paymentContext.Provider value={{payment,setPayment}}>
            <schedulingData.Provider value={{scheduleStatus,setScheduleStatus}}>
    {children}
    </schedulingData.Provider>
    </paymentContext.Provider>
    </medalContext.Provider>
    </addPriceContext.Provider>
    </addScheduleResponseContext.Provider>
</addReportResponseContext.Provider>



</>





  )
}

export default ContextShare