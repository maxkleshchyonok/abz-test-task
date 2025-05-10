"use client";
import React, { useRef, useState } from "react";

import SignUpButton from "@/app/components/signUpButton/SignUpButton";
import UserCards from "@/app/components/userCards/UserCards";
import SignUp from "@/app/components/signUp/SignUp";
import Header from "@/app/components/header/Header";

const Home = () => {
  const [reloadKey, setReloadKey] = useState(0);
  const targetUsersRef = useRef(null);
  const targetSignUpRef = useRef(null);

  const scrollToUsers = () => {
    targetUsersRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSignUp = () => {
    targetSignUpRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleUserCreated = () => {
    setReloadKey((prev) => prev + 1);
  };

  return (
    <>
      <Header scrollToUsers={scrollToUsers} scrollToSignUp={scrollToSignUp} />
      <div className="w-full flex flex-col items-center justify-center overflow-hidden">
        <div
          className={`
          lg:max-w-[1170px] relative mx-auto w-full h-[500px] lg:h-[650px]
          flex flex-col items-center justify-center text-white
          bg-[url('/backgrounds/main-background.webp')] bg-no-repeat
          bg-[length:350%_840px] bg-[position:left_50%_bottom_3%]
          lg:bg-[length:219%_auto] lg:bg-[position:left_50%_bottom_20%]
          md:bg-[length:180%_auto] md:bg-[position:left_75%_bottom_10%]
          sm:bg-[length:180%_auto] sm:bg-[position:left_75%_bottom_0%]
        `}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>
          <div className="z-20 w-full flex flex-col items-center gap-7 -mt-9  md:-mt-1">
            <h1 className="max-w-[380px] w-[90%] font-normal text-[40px]/[40px] text-center">
              Test assignment for front-end developer
            </h1>
            <p className="text-center text-[16px]/[26px] max-w-[380px] w-[88%]">
              What defines a good front-end developer is one that has skilled
              knowledge of HTML, CSS, JS with a vast understanding of User
              design thinking as they&apos;ll be building web interfaces with
              accessibility in mind. They should also be excited to learn, as
              the world of Front-End Development keeps evolving.
            </p>

            <SignUpButton onClick={scrollToSignUp} className={"text-black"} />
          </div>
        </div>

        <div
          ref={targetUsersRef}
          className="px-2 2xl:px-0 max-w-[1168px] flex flex-col items-center"
        >
          <h2 className="w-[80%] text-center text-[40px]/[40px] text-black/[87%] pt-[138px] pb-12 tracking-wide">
            Working with GET request
          </h2>
          <UserCards reload={reloadKey} />
        </div>

        <div
          ref={targetSignUpRef}
          className="max-w-[1168px] flex flex-col items-center justify-center pt-24"
        >
          <h2 className="w-[80%] sm:w-full text-center text-[40px]/[40px] text-black/[87%] py-10 tracking-wide">
            Working with POST request
          </h2>
          <SignUp onUserCreated={handleUserCreated} />
        </div>
      </div>
    </>
  );
};

export default Home;
