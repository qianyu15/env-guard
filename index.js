#!/usr/bin/env node

import chokidar from "chokidar";
import fs from "fs";


const target = ".env";


const rules = [
  {
    name: "API Key",
    regex: /API[_-]?KEY\s*=/i
  },
  {
    name: "Secret",
    regex: /SECRET\s*=/i
  },
  {
    name: "Token",
    regex: /TOKEN\s*=/i
  },
  {
    name: "Password",
    regex: /PASSWORD\s*=/i
  },
  {
    name: "Private Key",
    regex: /-----BEGIN PRIVATE KEY-----/
  }
];


let lastContent = "";


function checkEnv() {

  if (!fs.existsSync(target)) {
    return;
  }


  const content =
    fs.readFileSync(target, "utf8");


  if (content === lastContent) {
    return;
  }


  lastContent = content;


  const found = rules.filter(rule =>
    rule.regex.test(content)
  );


  if (found.length) {

    console.log(
      "\n🚨 env-guard detected sensitive data"
    );


    found.forEach(item =>
      console.log(
        `- ${item.name}`
      )
    );


    console.log(
      "Review your .env file.\n"
    );

  }

}


console.log(
  "🛡️ env-guard daemon started"
);


chokidar
.watch(target, {
  ignoreInitial: false
})
.on("add", checkEnv)
.on("change", checkEnv);



process.on("SIGINT", () => {

  console.log(
    "\nenv-guard stopped"
  );

  process.exit(0);

});
