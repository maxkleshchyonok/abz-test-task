import { Button } from "@/components/ui/button";
import React from "react";

const SignUpButton = ({ className, type, disabled, onClick }) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`w-[100px] ${className}`}
    >
      Sign up
    </Button>
  );
};

export default SignUpButton;
