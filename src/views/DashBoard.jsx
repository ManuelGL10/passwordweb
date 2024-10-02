import React from "react";
import DBNavBar from "../components/DBNavBar";
import DashBoardPage from "../components/DashBoardPage";
import PasswordTable from "../components/PasswordTable";

const DashBoard = () => {
    return(
        <div>
            <DBNavBar/>
            <PasswordTable/>
        </div>
    );
};

export default DashBoard; 