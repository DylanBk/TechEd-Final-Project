import Link from 'next/link';

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-black text-4xl mb-8">Login Page</h1>
      <Link href="/">
        <button className="px-4 py-2 border border-black text-black rounded">Back to Home</button>
      </Link>
    </div>
  );
} 