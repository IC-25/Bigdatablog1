import React from 'react'
import BlogDashboard from '../components/Dashboard/BlogDashboard'
import DashboardNavBar from '../components/Dashboard/DashboardNavBar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import AddNew from '../components/Dashboard/AddNew';


function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className='dashboard-container'>
      {modalOpen && <AddNew setOpenModal={setModalOpen} />}
        <div className="add-new">
           <div className="add-new-btn">
           <button onClick={() => {setModalOpen(true);}}><p>Add New</p> <FontAwesomeIcon icon={faPlus} className='plus-icon'/></button>
           </div>
        </div>
        <DashboardNavBar />
        <BlogDashboard />
    </div>
  )
}

export default Dashboard