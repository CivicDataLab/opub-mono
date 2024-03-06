import { promises as fs } from 'fs';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import ky from 'ky';
import tar from 'tar';

import { colors } from './logger';

export type RepoInfo = {
  username: string;
  name: string;
  branch: string;
  filePath: string;
};

async function getRepoInfo(url: URL): Promise<RepoInfo | undefined> {
  const [, username, name, t, _branch, ...file] = url.pathname.split('/');
  const filePath = file.join('/');

  if (
    // Support repos whose entire purpose is to be a NextJS example, e.g.
    // https://github.com/:username/:my-cool-nextjs-example-repo-name.
    t === undefined ||
    // Support GitHub URL that ends with a trailing slash, e.g.
    // https://github.com/:username/:my-cool-nextjs-example-repo-name/
    // In this case "t" will be an empty string while the next part "_branch" will be undefined
    (t === '' && _branch === undefined)
  ) {
    const infoResponse = await ky(
      `https://api.github.com/repos/${username}/${name}`
    ).catch((e) => e);

    if (infoResponse.statusCode !== 200) {
      return;
    }
    const info = JSON.parse(infoResponse.body);
    return { username, name, branch: info['default_branch'], filePath };
  }

  const branch = _branch;

  if (username && name && branch && t === 'tree') {
    return { username, name, branch, filePath };
  }
}

async function downloadTar(url: string) {
  const tempFile = join(tmpdir(), `next.js-cna-example.temp-${Date.now()}`);
  const response: any = await fetch(url);

  await pipeline(response.body, createWriteStream(tempFile));
  return tempFile;
}

export async function downloadAndExtractRepo(
  root: string,
  { username, name, branch, filePath }: RepoInfo
) {
  const tempFile = await downloadTar(
    `https://codeload.github.com/${username}/${name}/tar.gz/${branch}`
  );

  await tar.x({
    file: tempFile,
    cwd: root,
    strip: filePath ? filePath.split('/').length + 1 : 1,
    filter: (p: string) =>
      p.startsWith(
        `${name}-${branch.replace(/\//g, '-')}${
          filePath ? `/${filePath}/` : '/'
        }`
      ),
  });

  await fs.unlink(tempFile);
}

export async function verifyURL(example: string) {
  let repoUrl: URL | undefined;
  let repoInfo: RepoInfo | undefined;

  try {
    repoUrl = new URL(example);
  } catch (error: any) {
    if (error.code !== 'ERR_INVALID_URL') {
      console.error(error);
      process.exit(1);
    }
  }

  if (repoUrl) {
    if (repoUrl.origin !== 'https://github.com') {
      console.error(
        `Invalid URL: ${colors.error(
          `"${example}"`
        )}. Only GitHub repositories are supported. Please use a GitHub URL and try again.`
      );
      process.exit(1);
    }

    repoInfo = await getRepoInfo(repoUrl);

    if (!repoInfo) {
      console.error(
        `Found invalid GitHub URL: ${colors.error(
          `"${example}"`
        )}. Please fix the URL and try again.`
      );
      process.exit(1);
    }
  }

  return repoInfo;
}
