import { Application } from 'https://deno.land/x/oak@v10.6.0/mod.ts';

const baseUrl = 'https://web3-type-converter.onbrn.com';

const app = new Application();
app.use(async (ctx) => {
  try {
    const urlParts = ctx.request.url.pathname.split('/');
    const file = urlParts.pop();
    const fileExtension = file?.split('.').pop();
    if ((!file && !fileExtension) || (file && fileExtension === 'html')) {
      if (!ctx.request.url.hostname.startsWith('localhost')) {
        recordPageView(ctx.request.url.pathname);
      }
    }

    await ctx.send({
      root: `${Deno.cwd()}/src`,
      index: 'index.html',
    });
  } catch {
    ctx.response.status = 404;
    ctx.response.body = '404 File not found';
  }
});

console.log('Listening on http://localhost:8000');

await app.listen({ port: 8000 });

async function recordPageView(pathname: string) {
  try {
    await fetch('https://stats.onbrn.com/api/event', {
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        domain: baseUrl.replace('https://', ''),
        name: 'pageview',
        url: `${baseUrl}${pathname}`,
      }),
    });
  } catch (error) {
    console.log('Failed to log pageview');
    console.error(error);
  }
}
