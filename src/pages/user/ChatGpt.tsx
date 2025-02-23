/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import * as z from "zod";

import { Empty } from "@/components/Empty";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/shared/Form";
import { Heading } from "@/components/shared/Heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
});

const ChatGpt = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit = async (values:any) => {
    setIsLoading(true);

    try {
      const userMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      // const response = await axios.post("/api/conversation", {
      //   messages: newMessages,
      // });

      const botMessage = {
        role: "bot",
        content: "4dsf",
      };
      setMessages([...newMessages, botMessage]);
      form.reset();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const conversationPrompts = [
    "What would a conversation between a robot and a butterfly sound like?",
    "Describe a city where the buildings can talk.",
    "How would you explain the internet to a time traveler from the 1800s?",
    "Write a letter from the perspective of a raindrop.",
  ];

  return (
    <div>
      <Heading
        title="Conversation"
        description="Engage with Evoque's intelligent language model. Ask questions, explore ideas, or simply have a chat."
        icon={MessageSquare}
        iconColor="text-violet-600"
        bgColor="bg-violet-700/10"
      />

      <div className="grid grid-cols-2 gap-4 px-4 lg:p-8 pb-4">
        {conversationPrompts.map((prompt, index) => (
          <div
            key={index}
            className="border p-2 rounded cursor-pointer hover:bg-violet-200 text-sm"
            onClick={() => form.setValue("prompt", prompt)}
          >
            {prompt}
          </div>
        ))}
      </div>

      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 border-violet-500 border"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none font-light focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Imagine if kopa samsu could design your dream city. What would it look like?"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 lg:col-span-2 w-full"
              disabled={isLoading}
            >
              Generate
            </Button>
          </form>
        </Form>

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}

          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started" />
          )}

          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-8 w-full flex items-start gap-x-8 rounded-lg ${
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-violet-200"
                }`}
              >
                <div className="text-sm overflow-hidden leading-7">
                  <ReactMarkdown
                    components={{
                      pre: ({ node, ...props }) => (
                        <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                          <pre {...props} />
                        </div>
                      ),
                      code: ({ node, ...props }) => (
                        <code
                          className="bg-black/10 rounded-lg p-1"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {message.content || ""}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatGpt;
