"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useChat } from "@ai-sdk/react";
import { Bot, Send, User } from "lucide-react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 5,
  });

  return (
    <div className="flex flex-col w-full max-w-2xl py-8 mx-auto">
      <Card className="flex-1 mb-4">
        <CardContent className="p-4 overflow-y-auto max-h-[70vh]">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              Start a conversation...
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex gap-2 max-w-[80%] ${
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <Badge
                      variant={
                        message.role === "user" ? "default" : "secondary"
                      }
                      className="h-8 w-8 rounded-full p-1 flex items-center justify-center"
                    >
                      {message.role === "user" ? (
                        <User size={16} />
                      ) : (
                        <Bot size={16} />
                      )}
                    </Badge>

                    <div
                      className={`rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {message.parts.map((part, i) => {
                        switch (part.type) {
                          case "text":
                            return (
                              <div
                                key={`${message.id}-${i}`}
                                className="whitespace-pre-wrap"
                              >
                                {part.text}
                              </div>
                            );
                          case "tool-invocation":
                            if (part.toolInvocation.toolName === "getUser") {
                              // @ts-expect-error Invalid type
                              const user = part.toolInvocation.result?.user;

                              if (!user) {
                                return null;
                              }

                              return (
                                <Alert
                                  key={`${message.id}-${i}`}
                                  className="mt-2"
                                >
                                  <AlertTitle>{user.name}</AlertTitle>
                                  <AlertDescription>
                                    {user.email}
                                  </AlertDescription>
                                </Alert>
                              );
                            }
                            if (part.toolInvocation.toolName === "updateName") {
                              // @ts-expect-error Invalid type
                              const result = part.toolInvocation.result;

                              if (!result) {
                                return null;
                              }

                              return (
                                <Alert
                                  key={`${message.id}-${i}`}
                                  className="mt-2"
                                >
                                  <AlertTitle>{result.message}</AlertTitle>
                                </Alert>
                              );
                            }

                            return null;
                        }
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-t">
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              placeholder="Type your message..."
              onChange={handleInputChange}
              className="flex-1"
            />
            <Button type="submit" disabled={!input.trim()}>
              <Send size={18} />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
