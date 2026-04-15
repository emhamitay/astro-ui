#!/usr/bin/env node
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { createInterface } from 'readline';
import { get } from 'https';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'));

const BASE = 'https://raw.githubusercontent.com/emhamitay/astro-ui/main';

const REGISTRY = {
  accordion:  ['Accordion.astro'],
  alert:      ['Alert.astro', 'AlertTitle.astro', 'AlertDescription.astro'],
  avatar:     ['Avatar.astro'],
  badge:      ['Badge.astro'],
  breadcrumb: ['Breadcrumb.astro'],
  button:     ['Button.astro'],
  card:       ['Card.astro', 'CardHeader.astro', 'CardTitle.astro', 'CardDescription.astro', 'CardContent.astro', 'CardFooter.astro'],
  checkbox:   ['Checkbox.astro'],
  input:      ['Input.astro'],
  label:      ['Label.astro'],
  progress:   ['Progress.astro'],
  select:     ['Select.astro'],
  separator:  ['Separator.astro'],
  skeleton:   ['Skeleton.astro'],
  table:      ['Table.astro'],
  textarea:   ['Textarea.astro'],
};

// ── ANSI colors ──────────────────────────────────────────────────────────────
const green  = s => `\x1b[32m${s}\x1b[0m`;
const yellow = s => `\x1b[33m${s}\x1b[0m`;
const cyan   = s => `\x1b[36m${s}\x1b[0m`;
const red    = s => `\x1b[31m${s}\x1b[0m`;
const bold   = s => `\x1b[1m${s}\x1b[0m`;
const dim    = s => `\x1b[2m${s}\x1b[0m`;

// ── Utilities ─────────────────────────────────────────────────────────────────
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    get(url, res => {
      if (res.statusCode >= 400) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function ask(question, def = '') {
  const hint = def ? ` ${dim(`(${def})`)}` : '';
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => {
    rl.question(`${question}${hint} › `, answer => {
      rl.close();
      const trimmed = answer.trim();
      resolve(trimmed === '' ? def : trimmed);
    });
  });
}

function normalizeDir(dir) {
  return dir.replace(/\/+$/, '');
}

// Writes a file, asking to confirm overwrite if it already exists.
// Returns true if the file was written, false if skipped.
async function writeFileSafe(filePath, content, label) {
  if (existsSync(filePath)) {
    const ans = await ask(`  ${yellow(label)} already exists. Overwrite? ${dim('(y/N)')}`);
    if (ans.toLowerCase() !== 'y') {
      console.log(`  ${dim('↷')} Skipped ${dim(label)}`);
      return false;
    }
  }
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, content, 'utf8');
  console.log(`  ${green('✓')} ${label}`);
  return true;
}

// ── Commands ──────────────────────────────────────────────────────────────────
async function cmdInit() {
  console.log(bold('\n◆ Astro UI — Init\n'));

  // globals.css
  const stylesDir = normalizeDir(await ask('Where is your styles folder?', 'src/styles'));
  process.stdout.write(`\n  Fetching globals.css… `);
  let globalsContent;
  try {
    globalsContent = await fetchUrl(`${BASE}/src/styles/globals.css`);
    console.log(green('done'));
  } catch (e) {
    console.log(red('failed'));
    console.error(red(`  ${e.message}`));
    process.exit(1);
  }
  await writeFileSafe(join(process.cwd(), stylesDir, 'globals.css'), globalsContent, 'globals.css');

  // utils.ts
  console.log();
  const libDir = normalizeDir(await ask('Where is your lib folder?', 'src/lib'));
  process.stdout.write(`\n  Fetching utils.ts… `);
  let utilsContent;
  try {
    utilsContent = await fetchUrl(`${BASE}/src/lib/utils.ts`);
    console.log(green('done'));
  } catch (e) {
    console.log(red('failed'));
    console.error(red(`  ${e.message}`));
    process.exit(1);
  }
  await writeFileSafe(join(process.cwd(), libDir, 'utils.ts'), utilsContent, 'utils.ts');

  console.log(`\n${green('✓')} Init complete.\n`);
}

async function cmdAdd(args) {
  let names;

  if (args.includes('--all')) {
    names = Object.keys(REGISTRY);
  } else {
    if (!args.length) {
      console.error(red('No components specified.'));
      console.log(`Usage: ${cyan('npx astro-ui add')} ${dim('<component...>')}`);
      console.log(`       ${cyan('npx astro-ui add --all')}`);
      process.exit(1);
    }
    const unknown = args.filter(n => !REGISTRY[n]);
    if (unknown.length) {
      console.error(red(`Unknown component(s): ${unknown.join(', ')}`));
      console.log(`Run ${cyan('npx astro-ui list')} to see available components.`);
      process.exit(1);
    }
    names = args;
  }

  console.log(bold('\n◆ Astro UI — Add\n'));

  const destDir = normalizeDir(await ask('Where to install components?', 'src/components/astro'));

  const installed = [];

  for (const name of names) {
    console.log(`\n  ${cyan(name)}`);
    for (const file of REGISTRY[name]) {
      let content;
      try {
        content = await fetchUrl(`${BASE}/src/components/astro/${file}`);
      } catch (e) {
        console.log(`  ${red('✗')} ${file} ${dim(`(${e.message})`)}`);
        continue;
      }
      const dest = join(process.cwd(), destDir, file);
      const wrote = await writeFileSafe(dest, content, file);
      if (wrote) installed.push(file);
    }
  }

  // Suggest init if globals.css not found
  if (!existsSync(join(process.cwd(), 'src/styles/globals.css'))) {
    console.log(`\n${yellow('!')} globals.css not found — run ${cyan('npx astro-ui init')} to set up styles and utils.`);
  }

  if (installed.length) {
    console.log(`\n${green('✓')} Installed: ${installed.join(', ')}\n`);
  } else {
    console.log(`\n${dim('No files were installed.')}\n`);
  }
}

function cmdList() {
  console.log(bold('\n◆ Astro UI — Available Components\n'));
  const pad = Math.max(...Object.keys(REGISTRY).map(k => k.length)) + 2;
  for (const [name, files] of Object.entries(REGISTRY)) {
    console.log(`  ${cyan(name.padEnd(pad))}${dim(files.join(', '))}`);
  }
  console.log();
}

function cmdHelp() {
  console.log(`
${bold('astro-ui')} ${dim(`v${pkg.version}`)} — Astro shadcn/ui component installer

${bold('Usage:')}
  npx astro-ui ${cyan('<command>')} ${dim('[options]')}

${bold('Commands:')}
  ${cyan('init')}                  Fetch globals.css and utils.ts
  ${cyan('add')} ${dim('<components...>')}   Install one or more components
  ${cyan('add --all')}             Install all components
  ${cyan('list')}                  List all available components
  ${cyan('--version')}             Print version number

${bold('Examples:')}
  npx astro-ui init
  npx astro-ui add button
  npx astro-ui add card badge separator
  npx astro-ui add --all
`);
}

// ── Dispatch ──────────────────────────────────────────────────────────────────
const [,, cmd, ...rest] = process.argv;

switch (cmd) {
  case undefined:
  case '--help':
  case '-h':
    cmdHelp();
    break;
  case '--version':
  case '-v':
    console.log(pkg.version);
    break;
  case 'list':
    cmdList();
    break;
  case 'init':
    await cmdInit();
    break;
  case 'add':
    await cmdAdd(rest);
    break;
  default:
    console.error(red(`Unknown command: ${cmd}`));
    console.log(`Run ${cyan('npx astro-ui --help')} for usage.`);
    process.exit(1);
}
