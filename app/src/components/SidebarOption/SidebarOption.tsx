import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: "30px",
    },
    "&root:hover": {
        backgroundColor: "#e8f5fe",
        color: "#50b7f5",
        // transition: color 100ms ease-out;
    }
    
})

function SidebarOption({ text, Icon, active }: any) {
  return (
    // <div className={}
    <div></div>
  );
}
