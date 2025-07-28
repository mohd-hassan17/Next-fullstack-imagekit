"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {

   const { data: session } = useSession();

   console.log(session);
   
  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <div className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
     <Image src={session.user?.image|| "/default-avatar.png"} width={40}
  height={40} alt="image"
  className="rounded-full"/>

  <p>{session.user?.email}</p>
  <p>{session.user?.name}</p>
  <p>{session.user?.id}</p>
    </div>
  );
}
