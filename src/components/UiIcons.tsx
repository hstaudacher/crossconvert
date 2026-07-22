interface IconProps {
  className?: string;
}

export function PlusIcon({className}: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function TrashIcon({className}: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M9 7V4.5c0-.55.45-1 1-1h4c.55 0 1 .45 1 1V7M18.5 7l-.75 12.5c-.03.55-.45 1-1 1h-9.5c-.55 0-.97-.45-1-1L5.5 7M10 11v5.5M14 11v5.5" />
    </svg>
  );
}

export function MovementConversionIcon({className}: IconProps) {
  return (
    <svg className={className} viewBox="0 0 28 28" aria-hidden="true">
      <path d="M4 8.5h16.5M17 5l3.5 3.5L17 12M24 19.5H7.5M11 16l-3.5 3.5L11 23" />
      <path d="M7.5 14h3l1.5-3 3.25 6 1.75-3h3.5" />
    </svg>
  );
}
