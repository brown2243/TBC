import React from "react";
import "./Header2.css";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

const Header2 = () => {
  return (
    <div className="myStyle">
      <ul>
        <li>
          <a href="/Discover">
            <MenuIcon /> 프로젝트 둘러보기
          </a>
        </li>
        <li>
          <a href="#">프로젝트 올리기</a>
        </li>
        <img
          className="logo"
          src="https://www.flaticon.com/svg/static/icons/svg/2809/2809124.svg"
          alt="logo"
        />
        <li className="login">
          <a href="/login"> 로그인/회원가입</a>
        </li>
        <li className="search">
          <a href="#">
            <SearchIcon />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Header2;
