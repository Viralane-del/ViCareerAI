import { lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js';

let isConfigured = false;

export function configureLemonSqueezy() {
  // Avoid reconfiguring if already done in this process
  if (isConfigured) return;

  const apiKey = process.env.LEMONSQUEEZY_API_KEY;

  if (!apiKey) {
    console.error('[LemonSqueezy] ALL ENV:', Object.keys(process.env).filter(k => k.includes('LEMON')));
    console.error('[LemonSqueezy] LEMONSQUEEZY_API_KEY is not defined in environment variables.');
    throw new Error(`LEMONSQUEEZY_API_KEY is not defined. (Keys found: ${Object.keys(process.env).filter(k => k.includes('LEMON')).join(',')})`);
  }

  lemonSqueezySetup({
    apiKey,
    onError: (error) => {
      console.error('[LemonSqueezy SDK Error]:', error);
    },
  });

  isConfigured = true;
  console.log('[LemonSqueezy] SDK configured successfully.');
}

