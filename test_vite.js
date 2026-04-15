import { createServer } from 'vite';

async function test() {
  try {
    const server = await createServer({
      configFile: false,
      root: '.',
      server: { port: 5173 }
    });
    await server.listen();
    server.printUrls();
    console.log("Server started on port 5173");
  } catch (e) {
    console.error("Vite start error:", e);
  }
}
test();
