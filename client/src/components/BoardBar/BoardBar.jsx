import React from "react";
import './BoardBar.scss'
import { IoMdCafe } from 'react-icons/io'
import { FiMoreHorizontal } from 'react-icons/fi'

const BoardBar = () => {
  return (
    <>
        <div className="board-bar">
            <div className="board-bar__left">
              <div className="btn-tag hover">
                <IoMdCafe size={20} />
                <p>BanhTheCake</p>
              </div>
              <div className="separation"></div>
              <div className="btn-tag hover">
                <p>private workspace</p>
              </div>
              <div className="separation"></div>
              <div className="member-list">
                <div className="img-wrapper">
                  <img src="https://images.unsplash.com/photo-1607305387299-a3d9611cd469?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
                </div>
                <div className="img-wrapper">
                  <img src="https://images.unsplash.com/photo-1607305387299-a3d9611cd469?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
                </div>
                <div className="img-wrapper">
                  <img src="https://images.unsplash.com/photo-1607305387299-a3d9611cd469?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
                </div>
                <div className="img-wrapper">
                  <img src="https://images.unsplash.com/photo-1607305387299-a3d9611cd469?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
                </div>
                <p className="rest-member">+7</p>
              </div>
              <div className="btn-tag hover">
                <p>Invite</p>
              </div>
            </div>
            <div className="board-bar__right">
              <div className="btn-tag hover">
                <FiMoreHorizontal size={20} />
                <p>Show more</p>
              </div>
            </div>
        </div>
    </>
  );
};

export default BoardBar;
