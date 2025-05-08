"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const signUpSchema = z.object({
  name: z
    .string()
    .min(2, "Username is required.")
    .max(60, "Username should contain 2-60 characters."),
  email: z
    .string()
    .min(6, "Email is required")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must be a valid email according to RFC2822."
    ),
  phone: z
    .string()
    .regex(/^\+380\d{9}$/, "Number should start with code of Ukraine +380."),
  position: z
    .enum(
      ["Frontend developer", "Backend developer", "Designer", "QA"],
      "Position is required"
    )
    .default("Frontend developer"),
  profilePicture: z
    .any()
    .refine((file) => {
      if (!file) return false;
      return file instanceof File;
    }, "Profile picture is required.")
    .refine((file) => {
      if (!file) return true;
      const validTypes = ["image/jpeg", "image/jpg"];
      return validTypes.includes(file.type);
    }, "Invalid file type. Only JPEG/JPG is allowed.")
    .refine((file) => {
      if (!file) return true;
      return file.size <= 5 * 1024 * 1024;
    }, "File size must not exceed 5MB.")
    .refine(async (file) => {
      if (!file) return true;
      const image = await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
      });

      return image.width >= 70 && image.height >= 70;
    }, "Minimum size is 70x70px."),
});

const SignUp = () => {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "all",
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission (e.g., send data to the server)
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem className={"w-full"}>
              <FormControl>
                <Input
                  value={field.value || ""}
                  placeholder="Your name"
                  label={"Your name"}
                  ariaInvalid={!!fieldState.error}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem className={"w-full"}>
              <FormControl>
                <Input
                  value={field.value || ""}
                  placeholder="Email"
                  label={"Email"}
                  ariaInvalid={!!fieldState.error}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field, fieldState }) => (
            <FormItem className={"w-full"}>
              <FormControl>
                <Input
                  value={field.value || ""}
                  placeholder="Phone"
                  label={"Phone"}
                  ariaInvalid={!!fieldState.error}
                  {...field}
                />
              </FormControl>
              <FormDescription>{"+38 (XXX) XXX - XX - XX"}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem className="w-[380px] justify-start">
              <FormLabel
                className={"font-normal text-base/[26px] text-black/[87]"}
              >
                Select your position
              </FormLabel>
              <RadioGroup
                value={field.value || "Frontend developer"}
                onValueChange={field.onChange}
                className="flex flex-col space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Frontend developer" id="r1" />
                  <Label type={"radio"} htmlFor="r1">
                    Frontend developer
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Backend developer" id="r2" />
                  <Label type={"radio"} htmlFor="r2">
                    Backend developer
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Designer" id="r3" />
                  <Label type={"radio"} htmlFor="r3">
                    Designer
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="QA" id="r4" />
                  <Label type={"radio"} htmlFor="r4">
                    QA
                  </Label>
                </div>
              </RadioGroup>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="profilePicture"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Profile Picture</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => field.onChange(e.target.files[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!form.formState.isValid}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SignUp;
