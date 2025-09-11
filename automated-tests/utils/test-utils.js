const puppeteer = require('puppeteer');
const http = require('http');
const handler = require('serve-handler');

let server;

const startServer = async () => {
  server = http.createServer((req, res) => handler(req, res, { public: '.' }));
  await new Promise((resolve) => server.listen(0, resolve)); // 0 = auto port

  const { port } = server.address();
  const serverUrl = `http://127.0.0.1:${port}`;

  console.log(`💻 Test server is running at ${serverUrl} ✅`);
  return { port, serverUrl };
};

const stopServer = async () => {
  if (server) {
    const { port } = server.address();
    await new Promise((resolve) => server.close(resolve));
    console.log(`💻 Test server at http://127.0.0.1:${port} stopped 🛑`);
    server = null;
  }
};

const launchBrowser = async (headless = true) => {
  const { serverUrl } = await startServer();
  const browser = await puppeteer.launch({ headless, defaultViewport: null });
  const page = await browser.newPage();

  return { browser, page, serverUrl };
};

const teardownBrowser = async (browser, hangOnBrowser = false) => {
  if (hangOnBrowser) {
    await new Promise((resolve) => setTimeout(resolve, 30000));
  }
  await browser.close();
  await stopServer();
};

module.exports = { launchBrowser, teardownBrowser };