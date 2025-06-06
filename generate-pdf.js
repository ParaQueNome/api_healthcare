const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('C:/Users/guilhermeaa/guilherme/glossary_apiv2/docs/global.html', {waitUntil: 'networkidle2'}); // ajuste o caminho
  await page.pdf({path: 'documentation.pdf', format: 'A4'});

  await browser.close();
  console.log('PDF gerado com sucesso!');
})();