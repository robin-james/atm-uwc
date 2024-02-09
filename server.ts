import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('/sitemap.xml', async (req, res) => {

  
    const domain = req.header("x-forwarded-host")!.toString()
  

      const reponse : any = await fetch('https://api-airtrame.web.app/v0/firestore/host/airtrame-uwc.web.app');

      const siteMetadata = await reponse.json()
  
    const mapping = siteMetadata.mapping
    const prefix = 'https://'
  
  
    const urls = mapping.map((element : any) => {
      return `<url>
   <loc>`+ prefix + domain + `/` + element.loc + `</loc>
   <lastmod>`+ element.lastmod + `</lastmod>
   </url>`
    }).join('')
  
    async function generateSitemap() {
  
      return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  `+ urls + `
  </urlset>`
    }
  
  
    res.set('Content-Type', 'application/xml')
  
    const xml = await generateSitemap()
  
    res.write(xml);
    res.end()
  })
  
  
  
  server.get('/robots.txt', (req, res) => {
    // const f = req.hostname
  
    const d = req.header("x-forwarded-host")!.toString()
  
    const _robotTemplate =
      `User-agent: *
  Allow: /
      
  Sitemap: https://`+ d + `/sitemap.xml`
    res.type('text/plain');
    res.send(_robotTemplate);
  
  });

  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine
  server.get('*', async (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    if(req.path == '/'){
     
      commonEngine
        .render({
          bootstrap,
          documentFilePath: indexHtml,
          url: `${protocol}://${headers.host}${originalUrl}`,
          publicPath: browserDistFolder,
          providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
        })
        .then((html) => {
         res.send(html)
        })
        .catch((err) => next(err));
    }else{

      var routes : any[] = []

      const reponse : any = await fetch('https://api-airtrame.web.app/v0/firestore/host/airtrame-uwc.web.app');

      const siteMetadata = await reponse.json()
      siteMetadata.mapping.forEach((element : any) => {

      routes.push('/'+element.loc)
        
      });

      if(routes.includes(req.path)){
        commonEngine
        .render({
          bootstrap,
          documentFilePath: indexHtml,
          url: `${protocol}://${headers.host}${originalUrl}`,
          publicPath: browserDistFolder,
          providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
        })
        .then((html) => {
         res.send(html)
        })
        .catch((err) => next(err));
      }else{
        res.status(404)
        commonEngine
        .render({
          bootstrap,
          documentFilePath: indexHtml,
          url: `${protocol}://${headers.host}${originalUrl}`,
          publicPath: browserDistFolder,
          providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
        })
        .then((html) => {
          res.status(404)
         res.send(html)
        })
        .catch((err) => next(err));
       // res.json(routes)
      }
      
    
       
    }
    
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
