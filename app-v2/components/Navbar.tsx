import Image from "next/image";
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";

const Navbar = () => {
  return (
    <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="https://flowbite.com/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Twitterrrr
          </span>
        </a>
        <div className="flex md:order-2">
          <div className="mr-3">
            <WalletMultiButton />
          </div>
          <div>
            <WalletDisconnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
