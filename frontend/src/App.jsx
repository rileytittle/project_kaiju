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

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<MainLayout />}>
			<Route path="/boards" element={<Boards />}></Route>
		</Route>
	)
);
function App() {
	return <RouterProvider router={router} />;
}

export default App;
