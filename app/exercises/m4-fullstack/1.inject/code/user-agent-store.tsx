"use client";

import { userAgent } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Store {
  userAgent?: ReturnType<typeof userAgent>;
}

// Créer un nouveau store

// Créer un composant qui prends en paramètre le store et qui initialise le store
