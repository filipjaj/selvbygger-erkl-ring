import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // Get token from search params

  const url = new URL(req.nextUrl);

  const token = url.searchParams.get("token");

  if (!token) {
    return new Response(
      JSON.stringify({
        body: {
          error: "Invalid token",
        },
      }),
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }
  return new Response(
    JSON.stringify({
      body: {
        id: "1",
        name: "test",
        email: "filipjaj@gmail.com",
        token: "123",
      },
    })
  );
}
