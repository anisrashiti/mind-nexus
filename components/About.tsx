import { useTranslations } from "next-intl";

export default function MissionVision() {
  const t = useTranslations("home");

  const cards = [
    { icon: "◍", title: t("mission.title"), text: t("mission.text") },
    { icon: "◇", title: t("vision.title"), text: t("vision.text") },
  ];

  return (
    <div className="mt-14 grid w-full grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5 text-center">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-[18px] border border-ink/[0.09] bg-card p-[30px]"
        >
          <span className="mx-auto flex h-[38px] w-[38px] items-center justify-center rounded-xl bg-rust/[0.09] text-[17px] text-rust">
            {card.icon}
          </span>
          <h3 className="mt-[18px] mb-3 font-serif type-h4 font-medium text-black">
            {card.title}
          </h3>
          <p className="type-body text-muted">{card.text}</p>
        </div>
      ))}
    </div>
  );
}
