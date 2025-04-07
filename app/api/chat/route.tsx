import { auth } from "@/lib/auth";
import { getUser } from "@/lib/auth-session";
import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { headers } from "next/headers";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
    tools: {
      getUser: tool({
        description: "Get the user informations.",
        parameters: z.object({}),
        execute: async () => {
          const user = await getUser();
          return {
            user,
          };
        },
      }),
      updateName: tool({
        description: "Update the user name.",
        parameters: z.object({
          name: z.string().describe("The new name of the user"),
        }),
        execute: async ({ name }) => {
          const result = await auth.api.updateUser({
            headers: await headers(),
            body: {
              name: name,
            },
          });

          if (!result.status) {
            return {
              success: false,
              message: "Failed to update name",
            };
          }
          return {
            success: true,
            message: "Name updated successfully",
          };
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
