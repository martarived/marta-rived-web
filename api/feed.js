export const config = { runtime: 'edge' };

export default async function handler(req) {
  try {
    const res = await fetch('https://aquelveranodel92.substack.com/feed', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const xml = await res.text();
    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 's-maxage=300, stale-while-revalidate'
      }
    });
  } catch (e) {
    return new Response('Error', { status: 500 });
  }
}
