import type {CSSProperties} from 'react';
import {iconCodes, type CrossFitIconName} from '../icons';

interface CrossFitIconProps {
  name: CrossFitIconName;
  color?: string;
  size?: number;
  className?: string;
}

export function CrossFitIcon({name, color = 'currentColor', size = 32, className}: CrossFitIconProps) {
  const style: CSSProperties = {color, fontSize: size};
  return (
    <span className={`crossfit-icon ${className ?? ''}`} style={style} aria-hidden="true">
      {String.fromCodePoint(iconCodes[name])}
    </span>
  );
}
