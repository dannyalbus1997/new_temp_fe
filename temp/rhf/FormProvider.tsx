"use client";

import React, { ReactNode, CSSProperties } from "react";
import { FormProvider as Form, UseFormReturn } from "react-hook-form";

interface IFormProviderProps {
  children: ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  methods: UseFormReturn<any>;
  style?: CSSProperties;
}

export default function FormProvider({
  children,
  onSubmit,
  methods,
  style,
}: IFormProviderProps) {
  return (
    <Form {...methods}>
      <form style={style} onSubmit={onSubmit}>
        {children}
      </form>
    </Form>
  );
}
