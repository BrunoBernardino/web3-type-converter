import { Application } from 'https://deno.land/x/oak@v12.6.0/mod.ts';

const app = new Application();
app.use(async (ctx) => {
  try {
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
