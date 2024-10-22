"use client";
import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "/ingest",
    ui_host: "https://eu.posthog.com",
  });
}
export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <PostHogProvider client={posthog}>
      <PostHogAuthProvider>{children}</PostHogAuthProvider>
    </PostHogProvider>
  );
}

function PostHogAuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const userInfo = useUser();

  useEffect(() => {
    if (userInfo.user) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      posthog.identify(userInfo.user.id, {
        email: userInfo.user.emailAddresses[0]?.emailAddress,
        name: userInfo.user.fullName,
      });
    } else if (!auth.isSignedIn) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      posthog.reset();
    }
  }, [auth, userInfo]);

  return children;
}
