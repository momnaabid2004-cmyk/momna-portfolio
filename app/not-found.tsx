import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 text-center">
      <p className="eyebrow">404</p>
      <h1 className="text-display-md font-extrabold">This page doesn&apos;t exist.</h1>
      <Link href="/" className="rounded-full bg-accent px-6 py-3 font-semibold text-white">Back home</Link>
    </main>
  );
}
