/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Download, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Loader from "@/components/Loader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/shared/Form";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";
import {
  amountOptions,
  formSchema,
  imagePrompts,
  resolutionOptions,
} from "./constants.ts";

const getRandomUniquePrompts = (promptsArray:any, count:any) => {
  const randomIndexes = new Set();
  while (randomIndexes.size < count) {
    const n = Math.floor(Math.random() * promptsArray.length);
    randomIndexes.add(n);
  }
  return Array.from(randomIndexes).map((index:any) => promptsArray[index]);
};

const Midjourney = () => {
  const [currentPrompts, setCurrentPrompts] = useState(
    getRandomUniquePrompts(imagePrompts, 4)
  );
  const [images, setImages] = useState([]);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "", resolution: "4:3", amount: "1" },
  });
  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    setCurrentPrompts(getRandomUniquePrompts(imagePrompts, 4));
  }, []);

  const fetchStatus = async (task_id:any) => {
    const endpoint = "https://api.midjourneyapi.xyz/mj/v2/fetch";
    try {
      const response = await axios.post(endpoint, { task_id });
      if (response.data.status === "finished") return response;
      return new Promise((resolve) => {
        setTimeout(async () => resolve(await fetchStatus(task_id)), 20000);
      });
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };

  const onSubmit = async (values:any) => {
    try {
      const options = {
        headers: { "X-API-KEY": "your-api-key" },
        data: {
          prompt: values.prompt,
          aspect_ratio: values.resolution,
          process_mode: "fast",
        },
        url: "https://api.midjourneyapi.xyz/mj/v2/imagine",
        method: "post",
      };
      const result = await axios(options);
      if (result.status === 200) {
        const response:any = await fetchStatus(result.data.task_id);
        if (response.status === 200) {
          setImages((prev:any) => [...prev, response.data.task_result.image_url]);
        }
      }
    } catch (error:any) {
      toast.error(error);
    }
  };

  const handleBookmark = (src:any) => {
    axios
      .post("/api/favorite", { imageUrl: src })
      .then(() => toast.success("Bookmark added!"))
      .catch((error) => console.error("Bookmark error:", error));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Image Generator</h2>
      <div className="grid grid-cols-2 gap-4">
        {currentPrompts.map((prompt, index) => (
          <div
            key={index}
            className="border p-2 rounded cursor-pointer"
            onClick={() => form.setValue("prompt", prompt)}
          >
            {prompt}
          </div>
        ))}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-12 gap-2 mt-4 border p-4"
        >
          <FormField
            name="prompt"
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-6">
                <FormControl>
                  <Input placeholder="Describe your image" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="amount"
            render={({ field }) => (
              <FormItem className="col-span-6 lg:col-span-2">
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue defaultValue={field.value} />
                  </SelectTrigger>
                  <SelectContent>
                    {amountOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            name="resolution"
            render={({ field }) => (
              <FormItem className="col-span-6 lg:col-span-2">
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue defaultValue={field.value} />
                  </SelectTrigger>
                  <SelectContent>
                    {resolutionOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button className="col-span-12 lg:col-span-2" disabled={isLoading}>
            Generate
          </Button>
        </form>
      </Form>
      <div className="mt-4">
        {isLoading && <Loader />}
        {!isLoading && images.length === 0 && <p>No images generated.</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {images.map((src) => (
            <Card key={src} className="rounded-lg overflow-hidden">
              <div className="relative">
                <img src={src} alt="Generated" className="w-full" />
                <Heart
                  onClick={() => handleBookmark(src)}
                  className="absolute top-2 right-2 cursor-pointer text-red-500"
                />
              </div>
              <CardFooter className="p-2">
                <Button onClick={() => window.open(src, "_blank")}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Midjourney;
