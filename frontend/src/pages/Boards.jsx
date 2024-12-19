import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Boards() {
	const [boards, setBoards] = useState([]);
	useEffect(() => {
		axios.get("http://localhost:3000/boards/").then((response) => {
			setBoards(response.data);
			console.log(boards);
		});
	}, []);
	return (
		<>
			{boards.length > 0 ? (
				boards.map((board) => (
					<div className="card" key={board.id}>
						<div className="card-body">
							<Link to={`/boards/${board.id}/issues`}>
								<h5>{board.title}</h5>
							</Link>
							<p>
								Created on:{" "}
								{new Date(
									board.date_created
								).toLocaleDateString()}
							</p>
						</div>
					</div>
				))
			) : (
				<div class="spinner-border" role="status">
					<span class="visually-hidden">Loading...</span>
				</div>
			)}
		</>
	);
}

export default Boards;
