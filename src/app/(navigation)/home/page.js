import React from "react";

import SignUpButton from "@/app/components/signUpButton/SignUpButton";
import UserCards from "@/app/components/userCards/UserCards";

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div
        style={{
          backgroundImage: "url('/backgrounds/main-background.jpeg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1170px 1200px",
          backgroundPosition: "center bottom",
          position: "relative",
          margin: "0 auto",
        }}
        className="max-w-[1170px] h-[650px] flex flex-col items-center justify-center text-white"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>
        <div className="z-20 w-[50%] flex flex-col items-center gap-3">
          <h1>Test assignment for front-end developer</h1>
          <p className="text-center">
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they&apos;ll be building web interfaces with
            accessibility in mind. They should also be excited to learn, as the
            world of Front-End Development keeps evolving.
          </p>

          <SignUpButton className={"text-black"} />
        </div>
      </div>

      <div className="max-w-[1168px]">
        <h2>Working with GET request</h2>
        <UserCards />
      </div>
    </div>
  );
};

export default Home;
