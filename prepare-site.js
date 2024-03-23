import { promises as fs } from 'fs';
import * as theme from 'jsonresume-theme-eshaham';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { render } from 'resumed';

const args = yargs(hideBin(process.argv)).parse();
const resumeFilename = args._[0];
const buildFolder = args._[1];

if (!resumeFilename || !buildFolder) {
  console.error('Usage: node prepare-site.js <resume.json> <build-folder>');
  process.exit(1);
}

const resumeFileStr = await fs.readFile(resumeFilename, 'utf-8');
const resume = JSON.parse(resumeFileStr);
const html = await render(resume, theme);

await fs.writeFile(`${buildFolder}/index.html`, html);
