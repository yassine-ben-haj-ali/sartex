import React from 'react'
import SideBar from '../Components/SideBar'
import Navbar from '../Components/Navbar'

const Statistics = () => {
  return (
    <div
        className="page-wrapper"
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
      >
        <SideBar />
        <div className="body-wrapper">
          <Navbar />
          <iframe title="PowerBI" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=93e7d1c0-1032-4792-ba1d-c921ced072f3&autoAuth=true&embeddedDemo=true" frameborder="0" allowFullScreen="true"></iframe>
        </div>
     </div>     
  )
}

export default Statistics