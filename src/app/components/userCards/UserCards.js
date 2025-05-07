"use client";
import React from "react";

import { useGetUsers } from "@/app/hooks/useGetUsers";

const UserCards = () => {
  const { data: usersData } = useGetUsers({ page: 1, count: 6 });
  console.log(usersData);

  return <div>UserCards</div>;
};

export default UserCards;
