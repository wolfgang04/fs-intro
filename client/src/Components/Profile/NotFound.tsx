import React from "react";

const NotFound: React.FC<{ username: string }> = ({ username }) => {
	return <div className="">{username} not found</div>;
};

export default NotFound;
