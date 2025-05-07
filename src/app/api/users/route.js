import { usersService } from "@/services";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page"), 10) || 1; // Default to 1 if not provided
    const count = parseInt(searchParams.get("count"), 10) || 5; // Default to 5 if not provided

    const users = await usersService.getUsers(page, count);
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        status: error.status,
        details: error.data,
      },
      { status: error.status || 500 }
    );
  }
}
