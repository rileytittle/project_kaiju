import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Issues() {
	const { id } = useParams();
	const [issues, setIssues] = useState([]);
	useEffect(() => {
		axios
			.get(`http://localhost:3000/issues/${parseInt(id)}`)
			.then((response) => {
				setIssues(response.data);
				console.log(issues);
			});
	}, [id]);
	return (
		<>
			<div class="row">
				<div class="col-sm-4">
					<div class="card">
						<div class="card-body">
							<h5 class="card-title">Backlog</h5>
						</div>
					</div>
				</div>
				<div class="col-sm-4">
					<div class="card">
						<div class="card-body">
							<h5 class="card-title">In Development</h5>
						</div>
					</div>
				</div>
				<div class="col-sm-4">
					<div class="card">
						<div class="card-body">
							<h5 class="card-title">Completed</h5>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Issues;
