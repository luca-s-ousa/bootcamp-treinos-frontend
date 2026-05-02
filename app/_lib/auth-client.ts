import { createAuthClient } from "better-auth/react";

const apiBaseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

export const authClient = createAuthClient({
  baseURL: apiBaseURL,
});
