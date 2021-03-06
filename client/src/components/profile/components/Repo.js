import React from "react";
import PropTypes from "prop-types";

const Repo = ({
	repo: {
		name,
		description,
		html_url,
		stargazers_count,
		watchers_count,
		forks_count,
	},
}) => {
	return (
		<div className='repo bg-white p-1 my-1'>
			<div>
				<h4>
					<a href={html_url} target='_blank' rel='noopener noreferrer'>
						{name}
					</a>
				</h4>
				<p>{description}</p>
			</div>
			<div>
				<ul>
					<li className='badge badge-primary'>Stars: {stargazers_count}</li>
					<li className='badge badge-dark'>Watchers: {watchers_count}</li>
					<li className='badge badge-light'>Forks: {forks_count}</li>
				</ul>
			</div>
		</div>
	);
};

Repo.propTypes = {
	repo: PropTypes.object.isRequired,
};

export default Repo;
