import { Link, useNavigate } from "react-router-dom";
import { isAuthed, logout } from "../auth";

export default function HomePage() {
	const nav = useNavigate();
	const authed = isAuthed();

	return (
		<div className="max-w-xl mx-auto p-8 space-y-6">
			<h1 className="text-3xl font-bold">Fullstack Test</h1>
			<p className="text-slate-700">Minimal full-stack demo with JWT auth, Prisma/Postgres, and React Query.</p>

			{!authed ? (
				<div className="flex gap-3">
					<Link to="/login" className="border rounded px-4 py-2">
						Sign in
					</Link>
					<Link to="/register" className="border rounded px-4 py-2">
						Create account
					</Link>
				</div>
			) : (
				<div className="flex gap-3">
					<Link to="/items" className="border rounded px-4 py-2">
						Go to Items
					</Link>
					<button
						className="border rounded px-4 py-2"
						onClick={() => {
							logout();
							nav("/", { replace: true });
						}}
					>
						Sign out
					</button>
				</div>
			)}
		</div>
	);
}
