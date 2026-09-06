import React from 'react';
import styles from './Chip.module.css';

interface ChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export const Chip: React.FC<ChipProps> = ({ label, active = false, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[styles.chip, active ? styles.active : ''].join(' ')}
      aria-pressed={active}
    >
      {label}
    </button>
  );
};
