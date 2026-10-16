import { profile } from "@/data/profile";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-muted">
          {profile.name} · {profile.location}
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
