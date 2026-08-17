import { legalNav, footerNav } from "@/data/navigation";
import { availableSocials } from "@/data/socials";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t-4 border-black bg-[#171310]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-6">
        <div>
          <p className="brand-paint text-4xl">THE DERELICTS</p>
          <p className="mt-3 max-w-sm font-mark text-xl text-volt">
            The world threw them away. They built a better one.
          </p>
          <p className="mt-2 text-sm tracking-[0.12em] text-haze">
            MISFITS. GENIUSES. THE FUTURE.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="mb-3 text-sm tracking-[0.16em] text-volt">
            DIRECTORY
          </p>
          <ul className="space-y-2">
            {footerNav.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="text-paper hover:text-volt">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          {availableSocials.length ? (
            <>
              <p className="mb-3 font-mono text-[11px] tracking-[0.24em] text-volt">
                SIGNAL
              </p>
              <ul className="space-y-2">
                {availableSocials.map((social) => (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      className="text-paper hover:text-volt"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="font-mono text-xs tracking-[0.18em] text-haze">
              SOCIAL CHANNELS / NOT YET DISCOVERED
            </p>
          )}
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 md:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs text-haze sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono tracking-[0.16em]">
            © 2026 THE DERELICTS. ALL RIGHTS RESERVED.
          </p>
          <ul className="flex gap-4">
            {legalNav.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="hover:text-volt">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
