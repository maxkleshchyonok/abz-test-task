"use client";
import React, { useEffect } from "react";

import Image from "next/image";

import { useForm } from "react-hook-form";
import { useGetPositions, useSignUp } from "@/app/hooks";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { signUpSchema } from "@/lib/schema";
import { Loader } from "@/app/icons";
import SignUpButton from "../signUpButton/SignUpButton";
import successImage from "/public/success-image.png";

const SignUp = ({ onUserCreated }) => {
  const { data: positionsData, isLoading } = useGetPositions();
  const { signUp, isPending, isSuccess } = useSignUp();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "all",
    defaultValues: {
      position: positionsData?.positions[0]?.id || "",
    },
  });

  useEffect(() => {
    if (positionsData?.positions?.length) {
      form.setValue("position_id", positionsData.positions[0].id);
    }
  }, [positionsData, form]);

  useEffect(() => {
    if (isSuccess) {
      onUserCreated();
    }
  }, [isSuccess]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("position_id", data.position_id);
      formData.append("photo", data.photo);

      await signUp(formData);
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  };

  return isSuccess ? (
    <div className="w-full flex flex-col justify-center items-center gap-10">
      <h2 className="text-[40px]/[40px] text-black/[87] text-center">
        User successfully registered
      </h2>

      <Image
        width={328}
        height={290}
        src={successImage}
        alt="User created successfully"
      />
    </div>
  ) : (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center space-y-12.5 mt-4"
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
          name="position_id"
          render={({ field }) => (
            <FormItem className=" w-[90%] max-w-[380px] justify-start -mt-6">
              <FormLabel
                className={"font-normal text-base/[26px] text-black/[87]"}
              >
                Select your position
              </FormLabel>
              {isLoading ? (
                <Loader />
              ) : (
                <RadioGroup
                  value={field.value || positionsData?.positions[0].id}
                  onValueChange={field.onChange}
                  className="flex flex-col space-x-4"
                >
                  {positionsData?.positions.map((position) => (
                    <div
                      key={position.id}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value={position.id} id={position.id} />
                      <Label
                        className={"ml-1"}
                        type={"radio"}
                        htmlFor={position.id}
                      >
                        {position.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem className="w-full -mt-1">
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
        {isPending ? (
          <Loader />
        ) : (
          <SignUpButton type="submit" disabled={!form.formState.isValid} />
        )}
      </form>
    </Form>
  );
};

export default SignUp;
