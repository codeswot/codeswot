import { useEffect } from 'react';
import { trackVisitor } from '@/lib/firestore';

export const useFirebaseAnalytics = () => {
  useEffect(() => {
    // Track page visit
    const trackPageVisit = async () => {
      try {
        await trackVisitor({
          userAgent: navigator.userAgent,
          referrer: document.referrer || 'direct',
          page: window.location.pathname
        });
      } catch (error) {
        // Silently fail for analytics
        console.debug('Analytics tracking failed:', error);
      }
    };

    // Track on mount
    trackPageVisit();

    // Track page visibility changes (when user returns to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        trackPageVisit();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
};