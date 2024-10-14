import React from "react";
import PasswordTable from "../components/PasswordTable";
import NavBarHome from "../components/NavBarHome";

const DashBoard = () => {
    return(
        <div>
            <NavBarHome/>
            <PasswordTable/>
        </div>
    );
};

export default DashBoard; 