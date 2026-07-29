import type { APIRoute } from 'astro';
import { renderLlmsFullTxt } from '@/utils/llms';

export const prerender = true;

export const GET: APIRoute = async () => {
  const body = await renderLlmsFullTxt();
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
