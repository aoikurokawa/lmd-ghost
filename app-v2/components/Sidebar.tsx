import React, { useMemo, useState } from "react";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import HomeIcon from "@mui/icons-material/Home";
// import SearchIcon from "@mui/icons-material/Search";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
// import ListAltIcon from "@mui/icons-material/ListAlt";
// import PermIdentityIcon from "@mui/icons-material/PermIdentity";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import { makeStyles } from "@mui/styles";
// import { useDispatch } from "react-redux";

import SidebarOption from "./SidebarOption";
// import { ActionType, ChainAttr } from "../../store/chain/types";

require("@solana/wallet-adapter-react-ui/styles.css");

// const useStyles = makeStyles({
//   walletButton: {
//     width: "100%",
//     textOverflow: "ellipsis",
//     overflow: "hidden",
//     whiteSpace: "nowrap",
//   },
// });

function Sidebar() {
  const [walletAddress, setWalletAddress] = useState<string>();
  // const classes = useStyles();
  // const dispatch = useDispatch();

  const connectWallet = async () => {
    // @ts-ignore
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log("Connected with Public Key: ", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());

      // dispatch({
      //   type: ActionType.GET_WALLETADDRESS,
      //   payload: { walletAddress: response.publicKey.toString() },
      // });
    }
  };
  return (
    <div className="w-60 pt-5 pl-5 pr-5 border">
      {/* <TwitterIcon className="text-lg ml-5 mb-5" /> */}
      <SidebarOption text="Home" active={true} />
      <SidebarOption text="Explore" />
      <SidebarOption text="Notifications" />
      <SidebarOption text="Messages" />
      <SidebarOption text="Bookmarks" />
      <SidebarOption text="Lists" />
      <SidebarOption text="Profile" />
      <SidebarOption text="More" />

      <button className="border-none text-white font-bold rounded-2xl h-12 mt-5 bg-black w-full">
        Tweet
      </button>

      {/* <button
        className="bg-[#512da8] border-none text-white font-bold rounded-2xl h-12 mt-5 w-full p-2"
        onClick={connectWallet}
      >
        <p className="truncate overflow-hidden whitespace-nowrap">
          {walletAddress ? walletAddress : "Connect Wallet"}
        </p>
      </button> */}
    </div>
  );
}

export default Sidebar;
