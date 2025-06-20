

import React, { useState } from 'react';
import './Popover.css';
import Avtar from './shared/Avtar';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from "./utils/constant";
import axios from "axios";
import { toast } from 'react-toastify';
import { setUser } from "./redux/authSlice";

const Popover = ({ content }) => {
  const { user } = useSelector(store => store.auth);
  const [visible, setVisible] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        setVisible(false);
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      {visible &&
        <div className="popover-container">
          <button className="close-btn" onClick={() => setVisible(false)}>×</button>
          <Avtar url={user?.profile?.profilePhoto} />
          <p>{content}</p>

          {user?.role === "Student" &&
            <button className="popover-btn">
              <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}><span>View Profile</span></Link>
            </button>
          }

          <button className="popover-btn" onClick={logoutHandler}>
            <span>Logout</span>
          </button>
        </div>
      }
    </>
  );
};

export default Popover;

