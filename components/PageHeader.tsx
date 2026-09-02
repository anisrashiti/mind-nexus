export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto flex max-w-[1180px] flex-col items-center text-center">
      <div className="flex items-center gap-[9px] type-eyebrow text-rust">
        <span className="block h-[5px] w-[5px] rounded-full bg-rust" />
        {eyebrow}
      </div>
      <h1 className="mt-5 max-w-[26ch] font-serif type-h1 font-normal text-black">
        {title}
      </h1>
      {description && (
        <p className="mt-5 max-w-[66ch] type-lead text-muted">
          {description}
        </p>
      )}
    </div>
  );
}
