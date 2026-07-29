import type { APIRoute } from 'astro';
import { renderLlmsTxt } from '@/utils/llms';

export const prerender = true;

export const GET: APIRoute = async () => {
  const body = await renderLlmsTxt();
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
