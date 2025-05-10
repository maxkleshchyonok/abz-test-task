import { authService } from "@/services";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const token = await authService.getToken();
    return NextResponse.json(token);
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

export async function POST(request) {
  try {
    const { token } = await authService.getToken();
    if (!token) {
      throw new Error("Failed to retrieve token");
    }
    const body = await request.formData();

    const signUp = await authService.signUp(body, {
      headers: {
        Token: token,
      },
    });

    return NextResponse.json({ signUp });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        status: error.status,
        details: error.details,
      },
      { status: error.status || 500 }
    );
  }
}
