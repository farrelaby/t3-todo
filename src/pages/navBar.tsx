// move the navbar to a separate component
// and import it in the App component
//
// Path: src\pages\NavBar.tsx

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

interface NavBarProps {
  isToDoPage?: boolean;
  isDetailsPage?: boolean;
}

export default function NavBar({
  isToDoPage = false,
  isDetailsPage = false,
}: NavBarProps) {
  return (
    <nav className="sticky mb-8 flex h-14 w-full flex-row items-center justify-between  bg-white bg-opacity-10 px-16 backdrop-blur-lg">
      <div className="order-1 text-2xl font-semibold text-white">
        <span className="text-[hsl(280,100%,70%)]">T3</span> To-Do List
      </div>
      <ul className="order-2 flex flex-row gap-2">
        <li>
          <Link
            className={` ${
              isToDoPage ? "bg-white/10" : ""
            } rounded-full px-4 py-2 font-semibold text-white no-underline transition hover:bg-white/20`}
            href="/"
          >
            To-Do
          </Link>
        </li>
        <li>
          <Link
            className={` ${
              isDetailsPage ? "bg-white/10" : ""
            } rounded-full px-4 py-2 font-semibold text-white no-underline transition hover:bg-white/20`}
            href="/details"
          >
            What&apos;s This?
          </Link>
        </li>
      </ul>
      <div className="order-last">
        <AuthNavBar />
      </div>
    </nav>
  );
}

const AuthNavBar: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-row gap-4">
      {/* <p className="text-center text-2xl text-white">
          {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
          {secretMessage && <span> - {secretMessage}</span>}
        </p> */}
      <div>
        {sessionData && (
          <Link href="/profile">
            <Image
              className="h-10 w-10 rounded-full"
              src={sessionData.user?.image as string}
              alt={sessionData.user?.name as string}
              width={40}
              height={40}
            />
          </Link>
        )}
      </div>
      <button
        className="rounded-full bg-white/10 px-4 py-2 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
