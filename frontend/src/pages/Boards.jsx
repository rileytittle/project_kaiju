import React, { useEffect, useState } from "react";
import axios from "axios";
function Boards() {
	const [boards, setBoards] = useState([]);
	useEffect(() => {
		axios.get("http://localhost:3000/boards/").then((response) => {
			setBoards(response.data);
		});
	});
	return (
		<>
			{boards.map((board) => {
				<div class="card">
					<div class="card-body">{board.title}</div>
				</div>;
			})}
		</>
	);
}

export default Boards;
