import { NextRequest } from "next/server";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const result = LoginSchema.safeParse(body);

  if (!result.success) {
    return new Response(
      JSON.stringify({
        body: {
          error: "Invalid email or password",
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
        email: result.data.email,
        token: "123",
      },
    }),
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
}
