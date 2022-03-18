import React, { useMemo, useState } from "react";
import "./Sidebar.css";
import SidebarOption from "../SidebarOption";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";

import { ActionType, ChainAttr } from "../../store/chain/types";

require("@solana/wallet-adapter-react-ui/styles.css");

const useStyles = makeStyles({
  walletButton: {
    width: "100%",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
});

function Sidebar() {
  const [walletAddress, setWalletAddress] = useState<string>();
  const classes = useStyles();
  const dispatch = useDispatch();

  const connectWallet = async () => {
    // @ts-ignore
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log("Connected with Public Key: ", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());

      dispatch({
        type: ActionType.GET_WALLETADDRESS,
        payload: { walletAddress: response.publicKey.toString() },
      });
    }
  };
  return (
    <div className="sidebar">
      <TwitterIcon className="sidebar__twitterIcon" />
      <SidebarOption Icon={HomeIcon} text="Home" active={true} />
      <SidebarOption Icon={SearchIcon} text="Explore" />
      <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
      <SidebarOption Icon={MailOutlineIcon} text="Messages" />
      <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" />
      <SidebarOption Icon={ListAltIcon} text="Lists" />
      <SidebarOption Icon={PermIdentityIcon} text="Profile" />
      <SidebarOption Icon={MoreHorizIcon} text="More" />

      <Button variant="outlined" className="sidebar__tweet" fullWidth>
        Tweet
      </Button>

      <Button
        variant="outlined"
        className="sidebar__wallet"
        fullWidth
        onClick={connectWallet}
      >
        <p className={classes.walletButton}>
          {walletAddress ? walletAddress : "Connect Wallet"}
        </p>
      </Button>
    </div>
  );
}

export default Sidebar;
