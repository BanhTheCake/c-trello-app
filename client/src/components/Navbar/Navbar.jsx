import React from "react";
import './Navbar.scss'
import { CgMenuGridR } from 'react-icons/cg'
import { IoSearch } from 'react-icons/io5'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { BsHouse, BsClipboardData, BsInfoCircleFill } from 'react-icons/bs'
import { AiOutlinePlusSquare } from 'react-icons/ai'

const Navbar = () => {
  return (
    <>
        <div className="Navbar">
          <div className="Navbar-left">
            <div className="btn-tag hover">
              <CgMenuGridR size={23} />
            </div>
            <div className="btn-tag hover">
              <BsHouse size={23} />
            </div>
            <div className="btn-tag hover">
              <BsClipboardData size={23} />
              <p>Boards</p>
            </div>
            <div className="btn-tag">
              <input className="input" type="text" placeholder="Jump to... " spellCheck={false}/>
              <IoSearch size={23} />
            </div>
          </div>
          <div className="Navbar-center">
            <p>BanhTheTomato</p>
          </div>
          <div className="Navbar-right">
          <div className="btn-tag hover">
              <AiOutlinePlusSquare size={23} />
            </div>
            <div className="btn-tag hover">
              <BsInfoCircleFill size={18} />
            </div>
            <div className="btn-tag hover">
              <IoMdNotificationsOutline size={23} />
            </div>
            <div className="avatar">
              <img src="https://images.unsplash.com/photo-1607305387299-a3d9611cd469?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
            </div>
          </div>
      </div>
    </>
  );
};

export default Navbar;
