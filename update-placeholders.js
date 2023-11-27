import fs from 'fs';
import { JsonPlaceholderReplacer } from 'json-placeholder-replacer';
const placeHolderReplacer = new JsonPlaceholderReplacer();

const resumeFilename = process.argv[2];
const variableMapFilename = process.argv[3];
const outputFilename = process.argv[4];

if (!resumeFilename || !variableMapFilename || !outputFilename) {
  console.error(
    'Usage: node update-placeholders.js <resume.json> <variable-map.json> <output.json>'
  );
  process.exit(1);
}

const variableMapStr = fs.readFileSync(variableMapFilename);
const variableMap = JSON.parse(variableMapStr);

placeHolderReplacer.addVariableMap(variableMap);

const resumeStr = fs.readFileSync(resumeFilename);
const resume = JSON.parse(resumeStr);

const afterReplace = placeHolderReplacer.replace(resume);
const afterReplaceStr = JSON.stringify(afterReplace, null, 2);
fs.writeFileSync(outputFilename, afterReplaceStr);
