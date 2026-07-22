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
