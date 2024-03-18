#!/usr/bin/env node
import { deobfuscateCommand, obfuscateCommand } from './obfuscator-cmds';

function main() {
  const command = process.argv[2];
  const inputPath = process.argv[3];
  const outputPath = process.argv[4];

  if (!command || !inputPath) {
    console.info('\nUsage: @spa-tools/runtime-config-obf <obf|deobf> <input-file> <optional: output-file>\n');
    return;
  }

  switch (command) {
    case 'obf':
      obfuscateCommand(inputPath, outputPath);
      break;
    case 'deobf':
      deobfuscateCommand(inputPath, outputPath);
      break;
    default:
      console.error('Invalid command. Please use either "obf" or "deobf".');
      break;
  }
}

main();
