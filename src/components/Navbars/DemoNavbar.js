import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BrandLogo from "../../utilities/BrandLogo";
import useFetch from "../useFetch/useFetch";
import { AppContext } from "../Context/AppContext";


const DemoNavbar = () => {
  
  

  
  return (
    <>
      <header className="_navbar">
          <div className="_container _navbar_wrapper">
            <div className="_navbar_brand">
              <Link to="/">
                <BrandLogo/>
              </Link>
            </div>
          </div>
      </header>
    </>
  );
}


export default DemoNavbar;
