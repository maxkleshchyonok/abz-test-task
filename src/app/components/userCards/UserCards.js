"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useGetUsers } from "@/app/hooks/useGetUsers";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import photoCover from "/public/photo-cover.png";

const UserCards = () => {
  const [page, setPage] = useState(1);
  const { data: usersData = [] } = useGetUsers({ page, count: 6 });
  const [users, setUsers] = useState([]);

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
    <div className="flex flex-wrap justify-center gap-4">
      {users.map((user) => (
        <Card
          key={user.id}
          className={
            "flex flex-col items-center justify-center sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]"
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

            <h3 className="text-center w-full overflow-hidden text-ellipsis whitespace-nowrap">
              {user.name}
            </h3>
          </CardHeader>

          <CardContent
            className={
              "w-full flex flex-col items-center justify-center overflow-hidden"
            }
          >
            {[user.position, user.email, user.phone].map((el, index) => (
              <h3
                key={index}
                className="text-center w-full overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {el}
              </h3>
            ))}
          </CardContent>
        </Card>
      ))}

      <Button onClick={handleShowMore}>Show more</Button>
    </div>
  );
};

export default UserCards;
