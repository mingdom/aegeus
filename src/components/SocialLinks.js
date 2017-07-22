/* @flow */
import React from 'react';
import * as _ from 'lodash';
import FaTwitterSquare from 'react-icons/lib/fa/twitter-square';
import FaRedditAlien from 'react-icons/lib/fa/reddit-alien';
import FaGithubAlt from 'react-icons/lib/fa/github-alt';

const SOCIAL_DATA = {
	reddit: {
		url: 'https://www.reddit.com/r',
		icon: FaRedditAlien,
	},
	twitter: {
		url: 'https://www.twitter.com',
		icon: FaTwitterSquare,
	},
	github: {
		url: 'https://www.github.com',
		icon: FaGithubAlt
	}
}


function renderSocialLink(site, account): ?React.Element<any> {
	if (!account) {
		return null;
	}

	const socialData = SOCIAL_DATA[site];
	if (!socialData) {
		console.warn(`Invalid site: ${site}`, site);
		return null;
	}

	return (
		<a href={`${socialData.url}/${account}`} target='_blank'>
			{socialData.icon({size: 18})}
		</a>
	);
}

export const SocialLinks = (links: { data: any[] }) => {
	const socialLinks = _.map(links.data, (account, site) =>
		renderSocialLink(site, account));
	return (
		<div>
			{socialLinks}
		</div>
	);
}
