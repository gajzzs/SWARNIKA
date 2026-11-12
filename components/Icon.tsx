type Name =
  | "whatsapp"
  | "heart"
  | "heart-filled"
  | "video"
  | "calendar"
  | "arrow"
  | "close"
  | "menu"
  | "phone"
  | "pin"
  | "scale"
  | "check";

const paths: Record<Name, React.ReactNode> = {
  whatsapp: (
    <>
      <path d="M4.5 19.5l1.1-3.6A7.8 7.8 0 1 1 8.6 18.6z" />
      <path d="M9.2 8.6c.3 2.6 2.3 4.9 5 5.6l1-1.2-1.8-.9-.8.8a4.6 4.6 0 0 1-2.4-2.4l.8-.8-.9-1.8z" />
    </>
  ),
  heart: <path d="M12 19.5s-7-4.3-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.3c0 4.9-7 9.2-7 9.2z" />,
  "heart-filled": <path d="M12 19.5s-7-4.3-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.3c0 4.9-7 9.2-7 9.2z" fill="currentColor" />,
  video: (
    <>
      <rect x="3.5" y="6.5" width="12" height="11" rx="1.5" />
      <path d="M15.5 10.5l5-3v9l-5-3" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5.5" width="16" height="14" rx="1.5" />
      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
    </>
  ),
  arrow: <path d="M5 12h14M13.5 6.5L19 12l-5.5 5.5" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  menu: <path d="M4 8h16M4 16h16" />,
  phone: <path d="M6.5 4.5h3l1.5 4-2 1.3a10 10 0 0 0 5.2 5.2l1.3-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A15 15 0 0 1 5 6.1a1.5 1.5 0 0 1 1.5-1.6z" />,
  pin: (
    <>
      <path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  scale: (
    <>
      <path d="M12 4v15M7 19.5h10M5 7.5h14" />
      <path d="M5 7.5l-2.5 6a2.6 2.6 0 0 0 5 0zM19 7.5l-2.5 6a2.6 2.6 0 0 0 5 0z" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
};

export function Icon({ name, size = 20, title }: { name: Name; size?: number; title?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      className="icon"
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
