#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { input } from '@inquirer/prompts';


async function promptYesNo(message) {
  while (true) {
    const response = await input({ message });
    const lowerResponse = response.toLowerCase();
    if (lowerResponse === 'y' || lowerResponse === 'n') {
      return lowerResponse === 'y';
    }
    console.log("Please enter 'y' for yes or 'n' for no.");
  }
}

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
    console.log(`Component ${componentName} created successfully.`);
  } catch (error) {
    console.error(`Error creating component: ${error.message}`);
    throw error;
  }
}


async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || (args[0] !== 'create' && args[0] !== 'c') || (args[1] !== 'page' && args[1] !== 'p')) {
    console.log("Usage: nxt create page OR nxt c p");
    process.exit(1);
  }

  try {
    const isUsingSrc = await promptYesNo('Are you using src folder? [y/n]: ');
    const isUsingTS = await promptYesNo('Are you using TypeScript? [y/n]: ');
    
    const componentName = await input({ message: 'Enter the component name: ' });
    if (!componentName.trim()) {
      console.log("Component name cannot be empty. Exiting.");
      process.exit(1);
    }

    const baseDir = isUsingSrc ? 'src/app' : 'app';
    await createComponent(baseDir, componentName, isUsingTS);

  } catch (error) {
    console.error("An error occurred:", error);
    process.exit(1);
  }
}

main().catch(console.error);