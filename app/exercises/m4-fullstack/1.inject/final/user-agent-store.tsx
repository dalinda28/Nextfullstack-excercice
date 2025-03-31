"use client";

import { userAgent } from "next/server";
import { useEffect } from "react";
import { create } from "zustand";

interface Store {
  userAgent?: ReturnType<typeof userAgent>;
}

export const useUserAgentStore = create<Store>()(() => ({
  requests: {
    userAgent: undefined,
  },
}));

export const InitializeRequestStore = (props: { store: Store }) => {
  useEffect(() => {
    useUserAgentStore.setState(props.store);
  }, []);

  return null;
};
