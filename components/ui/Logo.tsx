import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo.svg"
      alt="Logo"
      width={200} // C'est juste pour le ratio Next.js
      height={50}
      className={className} // C'est ici que h-10 s'applique
      priority
    />
  );
}
