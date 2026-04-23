'use client';

import { useEffect } from 'react';

/**
 * LeadConnector chat widget integration.
 * Renders on all pages.
 */
export default function ChatWidget() {
  useEffect(() => {
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
      const script = document.getElementById('chat-widget-script');
      if (script) script.remove();

      const widgetContainer = document.querySelector('[id*="chat-widget"]');
      if (widgetContainer && widgetContainer.id !== 'chat-widget-script') {
        widgetContainer.remove();
      }
    };
  }, []);

  return null;
}
