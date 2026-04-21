'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * LeadConnector chat widget integration.
 * Renders on all pages EXCEPT /apply to comply with the rule that
 * pages with the chat widget must not have forms collecting phone numbers.
 */
export default function ChatWidget() {
  const pathname = usePathname();

  // Pages where the chat widget must NOT appear
  const excludedPaths = ['/apply'];
  const isExcluded = excludedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  useEffect(() => {
    if (isExcluded) return;

    // Check if the script is already loaded
    const existingScript = document.getElementById('chat-widget-script');
    if (existingScript) return;

    const script = document.createElement('script');
    script.id = 'chat-widget-script';
    script.src = 'https://widgets.leadconnectorhq.com/loader.js';
    script.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
    script.setAttribute('data-widget-id', '69e7e13e391771a408e332eb');
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount (if navigating to an excluded page)
      const script = document.getElementById('chat-widget-script');
      if (script) script.remove();

      // Also remove the widget container if one was injected
      const widgetContainer = document.querySelector('[id*="chat-widget"]');
      if (widgetContainer && widgetContainer.id !== 'chat-widget-script') {
        widgetContainer.remove();
      }
    };
  }, [isExcluded]);

  // Don't render anything on excluded pages
  if (isExcluded) return null;

  return null; // The widget is injected via script, no JSX needed
}
