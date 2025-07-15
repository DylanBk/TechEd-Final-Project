import Link from 'next/link';

export default function Signup() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-black text-4xl mb-8">Signup Page</h1>
      <Link href="/">
        <button className="px-4 py-2 border border-black text-black rounded">Back to Home</button>
      </Link>
    </div>
  );
}