import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Issues() {
	const { id } = useParams();
	const [issues, setIssues] = useState([]);
	const [refresh, setRefresh] = useState("");
	useEffect(() => {
		axios
			.get(`http://localhost:3000/issues/${parseInt(id)}`)
			.then((response) => {
				setIssues(response.data);
				console.log(issues);
			});
	}, [id, refresh]);

	async function changeStatus(issue_id, status) {
		//need to pass a status and issue_id to http request body
		await axios.patch(
			`http://localhost:3000/issues/${parseInt(id)}/update`,
			{ status: status, issue_id: issue_id }
		);
		if (refresh === "refresh") {
			setRefresh("");
		} else {
			setRefresh("refresh");
		}
	}
	return (
		<>
			<div class="row">
				<div class="col-sm-4">
					<div class="card">
						<div class="card-body">
							<h5 class="card-title">Backlog</h5>
							{issues.length > 0 ? (
								issues
									.filter((issue) => {
										return issue.status === "BL";
									})
									.map((issue) => (
										<div className="card" key={issue.id}>
											<div className="card-body">
												<h5>{issue.title}</h5>
												<p>
													Created on:{" "}
													{new Date(
														issue.date_created
													).toLocaleDateString()}
												</p>
											</div>
											<button
												type="button"
												class="btn btn-outline-info"
												onClick={() => {
													changeStatus(
														issue.id,
														"ID"
													);
												}}
											>
												In Development
											</button>
										</div>
									))
							) : (
								<></>
							)}
						</div>
					</div>
				</div>
				<div class="col-sm-4">
					<div class="card">
						<div class="card-body">
							<h5 class="card-title">In Development</h5>
							{issues.length > 0 ? (
								issues
									.filter((issue) => {
										return issue.status === "ID";
									})
									.map((issue) => (
										<div className="card" key={issue.id}>
											<div className="card-body">
												<h5>{issue.title}</h5>
												<p>
													Created on:{" "}
													{new Date(
														issue.date_created
													).toLocaleDateString()}
												</p>
											</div>
											<button
												type="button"
												class="btn btn-outline-info"
												onClick={() => {
													changeStatus(
														issue.id,
														"BL"
													);
												}}
											>
												Backlog
											</button>
											<button
												type="button"
												class="btn btn-outline-info"
												onClick={() => {
													changeStatus(issue.id, "C");
												}}
											>
												Completed
											</button>
										</div>
									))
							) : (
								<></>
							)}
						</div>
					</div>
				</div>
				<div class="col-sm-4">
					<div class="card">
						<div class="card-body">
							<h5 class="card-title">Completed</h5>
							{issues.length > 0 ? (
								issues
									.filter((issue) => {
										return issue.status === "C";
									})
									.map((issue) => (
										<div className="card" key={issue.id}>
											<div className="card-body">
												<h5>{issue.title}</h5>
												<p>
													Created on:{" "}
													{new Date(
														issue.date_created
													).toLocaleDateString()}
												</p>
											</div>
											<button
												type="button"
												class="btn btn-outline-info"
												onClick={() => {
													changeStatus(
														issue.id,
														"ID"
													);
												}}
											>
												In Development
											</button>
										</div>
									))
							) : (
								<></>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Issues;
