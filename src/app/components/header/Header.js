import React from "react";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import SignUpButton from "../signUpButton/SignUpButton";
import logo from "/public/logo.png";

const Header = () => {
  return (
    <div className="w-full h-[60px] bg-white flex items-center justify-center">
      <div className="w-full max-w-[1170px] flex items-center justify-between">
        <Image src={logo} alt="Logo" className="w-[104px] h-[26px]" />

        <div className="flex items-center gap-4 mr-4">
          <Button>Users</Button>
          <SignUpButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
