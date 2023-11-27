import { promises as fs } from 'fs';
import * as theme from 'jsonresume-theme-eshaham';
import puppeteer from 'puppeteer';
import { render } from 'resumed';

const resumeFilename = process.argv[2];
const resumePdfFilename = process.argv[3];

if (!resumeFilename || !resumePdfFilename) {
  console.error('Usage: node export-pdf.js <resume.json> <resume.pdf>');
  process.exit(1);
}

const resumeFileStr = await fs.readFile(resumeFilename, 'utf-8');
const resume = JSON.parse(resumeFileStr);
const html = await render(resume, theme);

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.setContent(html, { waitUntil: 'networkidle0' });
await page.pdf({
  path: resumePdfFilename,
  format: 'a4',
  printBackground: true,
});
await browser.close();
