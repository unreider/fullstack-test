import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ItemsPage from "./pages/ItemsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { isAuthed } from "./auth";

const qc = new QueryClient();

function Protected({ children }: { children: JSX.Element }) {
	return isAuthed() ? children : <Navigate to="/login" replace />;
}

export default function App() {
	return (
		<QueryClientProvider client={qc}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route
						path="/items"
						element={
							<Protected>
								<ItemsPage />
							</Protected>
						}
					/>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}
