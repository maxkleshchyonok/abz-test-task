import React from "react";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import SignUpButton from "../signUpButton/SignUpButton";
import logo from "/public/logo.png";

const Header = ({ scrollToUsers, scrollToSignUp }) => {
  return (
    <div className="w-full h-[60px] bg-white flex items-center justify-center">
      <div className="w-full max-w-[1170px] flex items-center justify-between px-[4.5vw] lg:px-15 xl:px-0">
        <Image src={logo} alt="Logo" className="w-[104px] h-[26px]" />

        <div className="flex items-center gap-2.5">
          <Button onClick={scrollToUsers} className={"w-[100px]"}>
            Users
          </Button>
          <SignUpButton onClick={scrollToSignUp} />
        </div>
      </div>
    </div>
  );
};

export default Header;
