import { setToken, api } from "../api/client";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
	const nav = useNavigate();
	async function submit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const f = new FormData(e.currentTarget);
		const email = String(f.get("email") || "");
		const password = String(f.get("password") || "");
		try {
			const { token } = await api("/api/auth/login", {
				method: "POST",
				body: JSON.stringify({ email, password }),
			});
			setToken(token);
			nav("/");
		} catch {
			alert("Invalid credentials");
		}
	}
	return (
		<form onSubmit={submit} className="max-w-sm mx-auto p-6 space-y-3">
			<h1 className="text-xl font-semibold">Login</h1>
			<input name="email" className="border rounded px-3 py-2 w-full" placeholder="Email" required />
			<input
				name="password"
				type="password"
				className="border rounded px-3 py-2 w-full"
				placeholder="Password"
				required
			/>
			<button className="border rounded px-4 py-2 w-full">Sign in</button>
			<div className="text-sm">
				New here?{" "}
				<a href="/register" className="underline">
					Create an account
				</a>
			</div>
		</form>
	);
}
