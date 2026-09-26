"use server";

import { redirect } from "next/navigation";
import { verifyCredentials } from "@/lib/auth/verify-credentials";
import { createSession } from "@/lib/auth/session";

export async function login(formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");

  if (typeof username !== "string" || typeof password !== "string") {
    redirect("/admin/login?error=1");
  }

  const isValid = await verifyCredentials(username, password);
  if (!isValid) {
    redirect("/admin/login?error=1");
  }

  await createSession(username);
  redirect("/admin");
}