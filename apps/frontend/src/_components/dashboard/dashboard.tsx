import React from "react";

interface DashboardProps {
	organization: {
		orgId: string;
		orgName: string;
		orgDescription: string;
	};
}

const Dashboard = ({ organization }: DashboardProps) => {
	return (
		<div>
			<div>
				<span>organization: {organization.orgName}</span>
				<p>{organization.orgDescription}</p>
			</div>
		</div>
	);
};

export default Dashboard;
