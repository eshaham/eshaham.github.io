import fs from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const args = yargs(hideBin(process.argv))
  .options({
    email: {
      type: 'string',
      description: 'The email to use in the resume',
    },
    phone: {
      type: 'string',
      description: 'The phone to use in the resume',
    },
  })
  .parse();

const email = args.email;
const phone = args.phone;
const resumeFilename = args._[0];
const outputFilename = args._[1];

if (!resumeFilename || !outputFilename) {
  console.error(
    'Usage: node update-placeholders.js --email <email> --phone <phone> <resume.json> <output.json>'
  );
  process.exit(1);
}

const resumeStr = fs.readFileSync(resumeFilename);
const resume = JSON.parse(resumeStr);

if (email) {
  resume.basics.email = email;
}
if (phone) {
  resume.basics.phone = phone;
}

const fixedResume = JSON.stringify(resume, null, 2);
fs.writeFileSync(outputFilename, fixedResume);
