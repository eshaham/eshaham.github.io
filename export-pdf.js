import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import puppeteer from 'puppeteer';

const args = yargs(hideBin(process.argv)).parse();
const resumePdfFilename = args._[0];

if (!resumePdfFilename) {
  console.error('Usage: node export-pdf.js <resume.pdf>');
  process.exit(1);
}

const browser = await puppeteer.launch({
  args: ['--no-sandbox'],
});
const page = await browser.newPage();

await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' });
await page.pdf({
  path: resumePdfFilename,
  format: 'a4',
  printBackground: true,
});
await browser.close();
