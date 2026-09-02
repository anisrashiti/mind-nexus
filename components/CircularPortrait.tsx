import Image from "next/image";

export default function CircularPortrait({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative mx-auto w-full ${className ?? ""}`}>
      <div className="pointer-events-none absolute -inset-[22px] rounded-full border border-rust/[0.18]" />
      <div className="relative aspect-square w-full overflow-hidden rounded-full shadow-[0_30px_60px_-24px_rgba(34,33,33,0.4)]">
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    </div>
  );
}
