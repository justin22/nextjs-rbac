"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const LoginButton = () => {
  const { data: session, status } = useSession();
  return (
    status === "loading" ? null :
      session ?
        <button style={{ marginRight: 10 }} onClick={() => signOut()}>
          Sign Out
        </button> :
        <button style={{ marginRight: 10 }} onClick={() => signIn()}>
          Sign in
        </button>
  );
};

export const ProfileButton = () => {
  const { data: session } = useSession();
  return session ? <Link href="/profile">Profile</Link> : null;
};
