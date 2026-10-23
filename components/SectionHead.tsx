import Reveal from "./Reveal";

export default function SectionHead({
  eyebrow,
  title,
  sub,
  center = false,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-14 ${center ? "mx-auto max-w-[720px] text-center" : "max-w-[760px] text-left"}`}>
      <Reveal>
        <div className="mb-4 inline-flex items-center gap-[9px] text-xs font-bold uppercase tracking-[2px] text-brand">
          <span className="inline-block h-px w-[22px] bg-brand" />
          {eyebrow}
        </div>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="m-0 text-[clamp(1.9rem,3.6vw,3rem)] font-extrabold leading-[1.08] tracking-[-1.2px] text-white text-balance">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={2}>
          <p className={`mt-4 max-w-[560px] text-[17px] leading-[1.65] text-white/60 ${center ? "mx-auto" : ""}`}>
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}
