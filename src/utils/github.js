import * as utils from '.';
// import GitHub from 'github-api';
import * as _ from 'lodash';

const GITHUB_ACCOUNTS = {
	"BTC": "bitcoin",
	"ETH": "ethereum"
}

// const gh = new GitHub();

export async function getCoinOrgData() {
	const ghOrgReposApi = (orgName) => `https://api.github.com/orgs/${orgName}/repos`;
	const promises = _.map(GITHUB_ACCOUNTS, (org, key) => {
		return utils.jsonGet(ghOrgReposApi(org));
  });

	const ghResponses = await Promise.all(promises);
	const bam =  _.map(ghResponses, async (repoRes) => {
		return await repoRes.json();
	});
	console.log('bam', bam);
	return bam;
}
