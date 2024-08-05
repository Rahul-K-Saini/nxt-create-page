#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { input, confirm } from '@inquirer/prompts';
import chalk from 'chalk';

async function createComponent(baseDir, componentName, isTS) {
  const componentDir = path.join(baseDir, componentName);
  const extension = isTS ? "tsx" : "jsx";
  const filePath = path.join(componentDir, `page.${extension}`);
  const capitalizedName = componentName.charAt(0).toUpperCase() + componentName.slice(1);

  const content = `
export default function ${capitalizedName}() {
  return (
    <div>
      <h1>${capitalizedName}</h1>
    </div>
  );
}
`.trim();

  try {
    await fs.mkdir(componentDir, { recursive: true });
    await fs.writeFile(filePath, content);
    console.log(chalk.green(`Component ${componentName} created successfully.`));
  } catch (error) {
    console.error(chalk.red(`Error creating component: ${error.message}`));
    throw error;
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || !['create', 'c'].includes(args[0]) || !['page', 'p'].includes(args[1])) {
    console.log(chalk.yellow("Usage: nxt create page OR nxt c p"));
    process.exit(1);
  }

  try {
    let isUsingSrc, isUsingTS, componentName;
    const useDefaults = args[2] === '-y';

    if (useDefaults) {
      isUsingSrc = true;
      isUsingTS = true;
      componentName = args[3];
    } else {
      isUsingSrc = await confirm({ message: 'Are you using src folder?', default: true });
      isUsingTS = await confirm({ message: 'Are you using TypeScript?', default: true });
      componentName = args[3] || await input({ message: 'Enter the component name:' });
    }

    if (!componentName?.trim()) {
      console.log(chalk.red("Component name cannot be empty. Exiting."));
      process.exit(1);
    }

    const baseDir = isUsingSrc ? 'src/app' : 'app';
    await createComponent(baseDir, componentName, isUsingTS);

  } catch (error) {
    console.error(chalk.red("An error occurred:"), error);
    process.exit(1);
  }
}

main().catch(console.error);