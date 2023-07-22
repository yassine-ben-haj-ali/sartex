import React, { useState } from 'react'
import SideBar from '../Components/SideBar'
import Navbar from '../Components/Navbar'
import { useSelector } from 'react-redux';
import { notification } from 'antd';
import axios from 'axios';

const EditProfile = () => {
    const [Data,setData]=useState({
        name: "",
        picture: "",
        description: "",
        phone: "",
    });
    const {Details,Token}=useSelector(state=>state.auth);
    const handleImageChange = (event) => {
        setData({
          ...Data,
          picture: event.target.files[0],
        });
      };
    
  const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", Data.name);
    formData.append("phone", Data.phone);
    formData.append("file", Data.picture);
    formData.append("description", Data.description);

    try {
      await axios.put(
        `http://localhost:8800/marque/${Details._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      notification.success({ message: "marque has been updated with success" });
    } catch (err) {
      notification.success({ message: err.response.data });
    }
  };

  const handleEditFormChange = (event) => {
    setData({
      ...Data,
      [event.target.name]: event.target.value,
    });
  };
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
    <div>
        <div class="card shadow-sm border-0">
                  <div class="card-body">
                      <h5 class="mb-0">My Account</h5>
                      <hr/>
                      <div class="card shadow-none border">
                        <div class="card-header">
                          <h6 class="mb-0">Marque INFORMATION</h6>
                        </div>
                        <div class="card-body">
                          <form class="row g-3">
                             <div class="col-12">
                                <label class="form-label">marque name</label>
                                <input type="text" class="form-control" name='name' value={Data.name} onChange={handleEditFormChange}/>
                             </div>
                             <div class="col-12">
                                <label class="form-label">phone</label>
                                <input type="text" class="form-control" name="phone" value={Data.phone} onChange={handleEditFormChange}/>
                             </div>
                             <div className='col-12'>
                             <label htmlFor="image">Image</label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="picture"
              onChange={handleImageChange}
            />
          </div>
          <div className="col-12">
            <label class="form-label" htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={Data.description}
              onChange={(e)=>handleEditFormChange(e)}
            ></textarea>
          </div>
                           
                            
                           
                          </form>
                        </div>
                      </div>
                      <div class="text-start">
                        <button type="button" class="btn btn-primary px-4" onClick={handleEditFormSubmit}>Save Changes</button>
                      </div>
                     </div>
                     </div>
    </div>
    </div>
    </div>
  )
}

export default EditProfile