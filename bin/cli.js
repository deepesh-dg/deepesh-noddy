#!usr/bin/env node

const { execSync } = require("child_process");
const runCommand = (command) => {
    try {
        execSync(command, { stdio: "inherit" });
    } catch (e) {
        console.log(`Failed to execute command ${command}`, e);
        return false;
    }
    return true;
};

const repoName = process.args[2];
const gitCheckoutCommand = `git cline --depth https://github.com/PrinceDeepu/deepesh-noddy ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Cloning the Repository with name ${repoName}`);

const checkOut = runCommand(gitCheckoutCommand);
if (!checkOut) process.exit(-1);

console.log(`Installing dependencies for ${repoName}`);
const installedDeps = runCommand(installDepsCommand);
if (!installedDeps) process.exit(-1);

console.log(
    `Congratulations, Now you are ready to use Noddy as your backend. Follow the following command to start`
);
console.log(`For Development`);
console.log(`cd ${repoName} && npm run dev`);
console.log(`For Production`);
console.log(`cd ${repoName} && npm run build && npm run start`);
