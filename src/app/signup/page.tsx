"use client";

import { signIn } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import DropDown from "@/components/Dropdown";
import Input from "@/components/Input";

const COURSE_LIST = [
  { value: "frontend4", label: "프론트엔드 4기" },
  { value: "backend3", label: "백엔드 3기" },
];

type FieldValues = {
  name: string;
  course: string;
};

const SignUpPage = () => {
  const methods = useForm<FieldValues>();

  const onSubmit = async (formValue: FieldValues) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/users`, {
      method: "PATCH",
      body: JSON.stringify(formValue),
    });
    if (response.ok) {
      const res = await signIn("github", { callbackUrl: "/" });
      console.log(res);
    }
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Input name="name" />
          <DropDown name="course" optionList={COURSE_LIST} />
          <button type="submit">제출하기</button>
        </form>
      </FormProvider>
    </div>
  );
};

export default SignUpPage;
