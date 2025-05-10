import { usersService } from "@/services";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const positions = await usersService.getPositions();
    return NextResponse.json(positions);
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
