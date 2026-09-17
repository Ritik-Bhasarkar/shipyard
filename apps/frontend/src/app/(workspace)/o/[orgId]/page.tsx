import Dashboard from "@/_components/dashboard/dashboard";
import { ROOT_URL } from "@/root.url";

interface DashboardPageProps {
	params: Promise<{ orgId: string }>;
}

const DashboardPage = async ({ params }: DashboardPageProps) => {
	const { orgId } = await params;

	const response = await fetch(`${ROOT_URL}/organization/${orgId}`, {
		cache: "no-store",
	});

	const data = await response.json();

	return (
		<div>
			<Dashboard organization={data} />
		</div>
	);
};

export default DashboardPage;
