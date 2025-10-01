import { useEffect } from 'react';
import { analytics } from '@/lib/firebase';
import { logEvent } from 'firebase/analytics';

export const useFirebaseAnalytics = () => {
  useEffect(() => {
    const sendPageView = () => {
      if (!analytics) return;
      try {
        logEvent(analytics, 'page_view', {
          page_location: window.location.href,
          page_path: window.location.pathname,
          page_title: document.title,
          referrer: document.referrer || 'direct'
        });
      } catch {}
    };

    // Track on mount
    sendPageView();

    // Track page visibility changes (when user returns to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        sendPageView();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
};