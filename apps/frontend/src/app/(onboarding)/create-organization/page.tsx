"use client";

import { ROOT_URL } from "@/root.url";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const Organization = () => {
	const [orgName, setOrgName] = useState("");
	const [orgDescription, setOrgDescription] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const router = useRouter();

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError("");
		setSuccessMessage("");

		if (!orgName.trim()) {
			setError("Organization name is required.");
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await fetch(`${ROOT_URL}/organization`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					orgName: orgName.trim(),
					orgDescription: orgDescription.trim() || undefined,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to create organization");
			}

			const data = await response.json();
			console.log("data", data);

			router.push(`/o/${data.orgId}`);
		} catch (submitError) {
			setError(
				submitError instanceof Error
					? submitError.message
					: "Something went wrong while creating the organization.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="organization">
				<div className="organization--section">
					<label htmlFor="organization">Name your organization</label>

					<input
						id="organization"
						type="text"
						value={orgName}
						onChange={(event) => setOrgName(event.target.value)}
						required
						disabled={isSubmitting}
					/>
				</div>

				<div className="organization--section">
					<label htmlFor="description">
						Organization Description
					</label>

					<textarea
						id="description"
						value={orgDescription}
						onChange={(event) =>
							setOrgDescription(event.target.value)
						}
						disabled={isSubmitting}
					/>
				</div>

				{error && <p role="alert">{error}</p>}
				{successMessage && <p role="status">{successMessage}</p>}

				<button
					type="submit"
					disabled={isSubmitting}>
					{isSubmitting ? "Creating..." : "Create organization"}
				</button>
			</div>
		</form>
	);
};

export default Organization;
