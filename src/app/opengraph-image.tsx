import { profile } from "@/data/profile";
import { ogImage, ogSize } from "@/lib/og";

export const alt = `${profile.name}, Computer Science student at York University`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage(profile.name, "CS @ York University");
}
