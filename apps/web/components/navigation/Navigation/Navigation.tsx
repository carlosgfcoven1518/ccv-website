'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';

import { classNames } from '@/lib/classNames';

import styles from './Navigation.module.css';

export type NavigationItem = {
  label: string;
  href: string;
};

export type NavigationProps = {
  items: readonly NavigationItem[];
  brandLabel?: string;
  homeHref?: string;
  logoVariant?: 'positive' | 'negative';
  currentHref?: string;
  stickyBehavior?: 'afterHero' | 'transition';
};

export function Navigation({
  items,
  brandLabel = 'CCV',
  homeHref = '/',
  logoVariant = 'positive',
  currentHref,
  stickyBehavior = 'transition',
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <header
      className={classNames(
        styles.header,
        styles[logoVariant],
        styles[stickyBehavior],
      )}
      data-menu-open={isOpen || undefined}
    >
      <div className={styles.inner}>
        <Link
          className={styles.brand}
          href={homeHref}
          aria-label={`${brandLabel} — Inicio`}
        >
          {brandLabel}
        </Link>

        <button
          ref={buttonRef}
          className={styles.menuButton}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span>{isOpen ? 'Cerrar' : 'Menú'}</span>
        </button>

        <nav
          id={panelId}
          className={classNames(styles.navigation, isOpen && styles.open)}
          aria-label="Navegación principal"
        >
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={`${item.href}-${item.label}`}>
                <Link
                  className={styles.link}
                  href={item.href}
                  aria-current={currentHref === item.href ? 'page' : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
