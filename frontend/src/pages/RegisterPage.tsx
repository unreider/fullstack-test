import { api } from "../api/client";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RegisterPage() {
	const nav = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	async function submit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);
		setLoading(true);
		const f = new FormData(e.currentTarget);
		const email = String(f.get("email") || "");
		const password = String(f.get("password") || "");
		try {
			await api("/api/auth/register", {
				method: "POST",
				body: JSON.stringify({ email, password }),
			});
			// Option A: redirect to login after successful registration
			nav("/login", { replace: true });
		} catch (err: any) {
			setError(() => {
				try {
					const parsed = JSON.parse(err.message);
					return parsed?.message || "Registration failed";
				} catch {
					return "Registration failed";
				}
			});
		} finally {
			setLoading(false);
		}
	}

	return (
		<form onSubmit={submit} className="max-w-sm mx-auto p-6 space-y-3">
			<h1 className="text-xl font-semibold">Create account</h1>
			{error && <div className="text-red-600 text-sm">{error}</div>}
			<input name="email" type="email" className="border rounded px-3 py-2 w-full" placeholder="Email" required />
			<input
				name="password"
				type="password"
				className="border rounded px-3 py-2 w-full"
				placeholder="Password"
				required
			/>
			<button disabled={loading} className="border rounded px-4 py-2 w-full">
				{loading ? "Creating…" : "Sign up"}
			</button>
			<div className="text-sm">
				Already have an account?{" "}
				<Link to="/login" className="underline">
					Sign in
				</Link>
			</div>
		</form>
	);
}
