import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">EduMorph</h1>

      {session ? (
        <>
          <p className="mb-2 text-gray-700">Hi, {session.user.name} 👋</p>
          <img src={session.user.image} alt="profile" className="rounded-full w-16 h-16 mb-4" />

          <button
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mb-3"
          >
            Sign Out
          </button>

          <Link
            href="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl"
          >
            Enter Dashboard
          </Link>
        </>
      ) : (
        <>
          <p className="mb-4 text-gray-700">Your Personalized AI Tutor</p>
          <button
            onClick={() => signIn("google")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl"
          >
            Sign in with Google
          </button>
        </>
      )}
    </div>
  );
}
