import chalk from 'chalk';
import { execSync } from 'child_process';

export async function yalcPush() {
  return {
    name: 'postbuild-commands',
    closeBundle() {
      try {
        const pkgs = execSync(`npx yalc push`, { stdio: 'pipe' })
          .toString()
          .split('\n')
          .filter((x) => / added ==> /i.test(x))
          .map((x) => {
            const parts = x.split(' ');
            return { pkg: parts[1], dest: parts[4] };
          });

        process.stdout.write('\n');

        for (const msg of pkgs) {
          process.stdout.write(`${chalk.cyan(`yalc push`)} ${chalk.gray(msg.pkg)} ${chalk.white(`» ${msg.dest}`)}\n`);
        }
      } catch {
        // silence errors, we don't want weird shit to happen when the dev doesn't have yalc installed.
      }
    },
  };
}
