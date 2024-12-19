import React from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {
	return (
		<>
			<nav class="navbar navbar-expand-lg bg-body-tertiary">
				<div class="container-fluid">
					<div class="collapse navbar-collapse" id="navbarNav">
						<ul class="navbar-nav">
							<li class="nav-item">
								<a
									class="nav-link"
									aria-current="page"
									href="/"
								>
									Home
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="/boards">
									Boards
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<Outlet />
		</>
	);
}

export default MainLayout;
