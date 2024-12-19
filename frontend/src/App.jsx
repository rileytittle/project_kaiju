import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Boards from "./pages/Boards";
import Issues from "./pages/Issues";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<MainLayout />}>
			<Route path="/boards" element={<Boards />}></Route>
			<Route path="/boards/:id/issues" element={<Issues />}></Route>
		</Route>
	)
);
function App() {
	return <RouterProvider router={router} />;
}

export default App;
