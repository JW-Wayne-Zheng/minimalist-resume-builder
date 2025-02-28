import { useEffect } from 'react';

interface ShortcutConfig {
  key: string;
  ctrlKey?: boolean;
  action: () => void;
}

export const useKeyboardShortcuts = (shortcuts: ShortcutConfig[]) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      shortcuts.forEach(shortcut => {
        if (
          event.key.toLowerCase() === shortcut.key.toLowerCase() &&
          (!shortcut.ctrlKey || (shortcut.ctrlKey && event.ctrlKey))
        ) {
          event.preventDefault();
          shortcut.action();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};