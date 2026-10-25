import Image from "next/image";
import { BASE_PATH } from "@/lib/site";

// MME Group Enterprise Inc emblem: transparent PNG (white lettering, so dark backgrounds only).
// Source artwork is 440×253; `height` sets the rendered size and the width follows the aspect ratio.
const RATIO = 440 / 253;

export default function Logo({
  height = 52,
  priority = false,
  alt = "MME Group Enterprise Inc",
}: {
  height?: number;
  priority?: boolean;
  alt?: string;
}) {
  return (
    <Image
      src={`${BASE_PATH}/images/logo.png`}
      alt={alt}
      width={Math.round(height * RATIO)}
      height={height}
      priority={priority}
      className="block h-auto max-w-full"
    />
  );
}
