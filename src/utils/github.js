import * as utils from '.';

export async function getRepoData(repo) {
	const api = `https://api.github.com/repos/${repo}`;
	return await utils.jsonGet(api);
}