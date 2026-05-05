// Development plugin to catch API endpoints that don't use backendFetch
export default defineNitroPlugin((nitroApp) => {
  if (process.env.NODE_ENV === 'development') {
    // Hook into all API handlers to check for proper error handling
    nitroApp.hooks.hook('request', async (event) => {
      const url = getRequestURL(event);
      
      // Only check API endpoints
      if (!url.pathname.startsWith('/api/')) return;
      
      // Check if this is a proxy endpoint (should use backendFetch)
      const isProxyEndpoint = url.pathname.includes('/api/') && 
                           !url.pathname.includes('/api/v1/') &&
                           !url.pathname.includes('/_nuxt/');
      
      if (isProxyEndpoint) {
        // In development, we could add checks here to ensure backendFetch is used
        // For now, this serves as a reminder for developers
        console.log(`🔍 Proxy endpoint: ${url.pathname} - ensure backendFetch is used`);
      }
    });
  }
});
