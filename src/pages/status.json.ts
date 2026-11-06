import type { APIRoute } from 'astro';
import status from '../data/status.json';

/** Statický /status.json, ze kterého si stránka průběžně načítá aktuální stav. */
export const GET: APIRoute = () =>
  new Response(JSON.stringify(status), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
