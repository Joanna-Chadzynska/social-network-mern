import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileItem = ({ profile }) => {
	const { user, status, company, location, skills } = profile;

	return (
		<div className='profile bg-light'>
			<img className='round-img' src={user?.avatar} alt='' />
			<div>
				<h2>{user?.name}</h2>
				<p>
					{status} {company && <span> at {company}</span>}
				</p>
				<p className='my-1'>{location && <span>{location}</span>}</p>
				<Link to={`/profile/${user?._id}`} className='btn btn-primary'>
					View Profile
				</Link>
			</div>

			<ul>
				{skills.slice(0, 4).map((skill, index) => (
					<li key={index} className='text-primary'>
						<i className='fas fa-check'></i> {skill}
					</li>
				))}
			</ul>
		</div>
	);
};

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default ProfileItem;
