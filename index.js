#!/usr/bin/env node

import fs from "fs";
import { execSync } from "child_process";


const blockedFiles = [
  ".env",
  ".env.local",
  ".env.production",
  "private.key",
  "id_rsa"
];


const secretPatterns = [
  /API[_-]?KEY\s*=/i,
  /SECRET[_-]?KEY\s*=/i,
  /ACCESS[_-]?TOKEN\s*=/i,
  /PASSWORD\s*=/i,
  /-----BEGIN PRIVATE KEY-----/
];


function getStagedFiles() {
  try {
    return execSync(
      "git diff --cached --name-only",
      { encoding: "utf8" }
    )
      .split("\n")
      .filter(Boolean);

  } catch {
    return [];
  }
}


function scanFiles(files) {

  const warnings = [];

  for (const file of files) {

    if (blockedFiles.some(x => file.endsWith(x))) {
      warnings.push(
        `${file}: sensitive file detected`
      );
    }


    if (!fs.existsSync(file)) continue;


    const content =
      fs.readFileSync(file, "utf8");


    for (const pattern of secretPatterns) {

      if (pattern.test(content)) {

        warnings.push(
          `${file}: possible secret detected`
        );

      }

    }
  }

  return warnings;
}



const files = getStagedFiles();
const warnings = scanFiles(files);


if (warnings.length > 0) {

  console.log("\n🚨 env-guard blocked commit\n");

  for (const warning of warnings) {
    console.log(`- ${warning}`);
  }

  console.log(
    "\nRemove secrets before pushing to GitHub.\n"
  );

  process.exit(1);

}


console.log(
  "✅ env-guard: no secrets found"
);
