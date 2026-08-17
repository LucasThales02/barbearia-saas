import { useEffect, useState } from 'react';

const SIDEBAR_STORAGE_KEY = 'adminHMD.sidebarMini';
const DESKTOP_BREAKPOINT = '(min-width: 992px)';

export function useSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isSidebarMini, setIsSidebarMini] = useState(() => {
    return localStorage.getItem(SIDEBAR_STORAGE_KEY) === 'true';
  });

  function isDesktop() {
    return window.matchMedia(DESKTOP_BREAKPOINT).matches;
  }

  function toggleSidebar() {
    if (isDesktop()) {
      setIsSidebarMini((current) => {
        const nextState = !current;

        localStorage.setItem(SIDEBAR_STORAGE_KEY, String(nextState));

        return nextState;
      });

      return;
    }

    setIsSidebarOpen((current) => !current);
  }

  function closeSidebar() {
    setIsSidebarOpen(false);
  }

  useEffect(() => {
    function handleResize() {
      if (isDesktop()) {
        setIsSidebarOpen(false);
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    isSidebarOpen,
    isSidebarMini,
    toggleSidebar,
    closeSidebar,
  };
}
