import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-black text-4xl mb-8">Landing Page</h1>
      <div className="space-x-4">
        <Link href="/login">
          <button className="px-4 py-2 border border-black text-black rounded">Login</button>
        </Link>
        <Link href="/signup">
          <button className="px-4 py-2 border border-black text-black rounded">Sign Up</button>
        </Link>
        <Link href="/shop">
          <button className="px-4 py-2 border border-black text-black rounded">Shop</button>
        </Link>
      </div>
    </div>
  );
}
