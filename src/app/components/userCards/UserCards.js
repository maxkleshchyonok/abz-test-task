"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useGetUsers } from "@/app/hooks";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import photoCover from "/public/photo-cover.png";
import { Loader } from "@/app/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const UserCards = ({ reload }) => {
  const [page, setPage] = useState(1);
  const { data: usersData = [], isLoading } = useGetUsers({ page, count: 6 });
  const [users, setUsers] = useState([]);
  console.log(usersData);

  useEffect(() => {
    if (reload) {
      setPage(1);
      setUsers([]);
    }
  }, [reload]);

  useEffect(() => {
    if (!usersData || !usersData.users) {
      return;
    }

    setUsers((prev) => [...prev, ...usersData.users]);
  }, [usersData]);

  const handleShowMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col justify-center items-center gap-13 lg:px-8 xl:px-0">
        <div className="flex flex-wrap justify-center gap-5 md:gap-4 lg:gap-7">
          {users.map((user) => (
            <Card
              key={user.id}
              className={
                "flex flex-col items-center justify-center " +
                "w-[95%] max-w-[370px] sm:w-[calc(50%-1rem)] sm:min-w-[282px] sm:max-w-[344px] " +
                "lg:w-[calc(31.333%-1rem)] lg:min-w-[282px] lg:max-w-[370px] 2xl:w-[370px]"
              }
            >
              <CardHeader
                className={"w-full flex flex-col items-center justify-center"}
              >
                <Avatar>
                  <AvatarImage src={user.photo} />
                  <AvatarFallback>
                    <Image src={photoCover} alt="Photo cover" />
                  </AvatarFallback>
                </Avatar>
              </CardHeader>

              <Tooltip>
                <TooltipTrigger asChild>
                  <h3 className="mt-4 max-w-[90%] text-center overflow-hidden text-ellipsis whitespace-nowrap cursor-default">
                    {user.name}
                  </h3>
                </TooltipTrigger>
                <TooltipContent side={"bottom"}>{user.name}</TooltipContent>
              </Tooltip>

              <CardContent
                className={
                  "w-full flex flex-col items-center justify-center overflow-hidden"
                }
              >
                {[user.position, user.email, user.phone].map((el, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <h3 className="text-center max-w-[90%] overflow-hidden text-ellipsis whitespace-nowrap cursor-default">
                        {el}
                      </h3>
                    </TooltipTrigger>
                    <TooltipContent side={"bottom"}>{el}</TooltipContent>
                  </Tooltip>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
        {usersData?.page !== usersData?.total_pages && (
          <Button className={"w-[120px]"} onClick={handleShowMore}>
            Show more
          </Button>
        )}
        {isLoading && <Loader />}
      </div>
    </TooltipProvider>
  );
};

export default UserCards;
