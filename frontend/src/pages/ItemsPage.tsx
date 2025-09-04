import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { api } from "../api/client";
import { useState } from "react";
import { logout } from "../auth";
import { useNavigate, Link } from "react-router-dom";

export default function ItemsPage() {
	const nav = useNavigate();
	const qc = useQueryClient();
	const [q, setQ] = useState("");
	const { data, isLoading } = useQuery({
		queryKey: ["items", q],
		queryFn: () => api(`/api/items?q=${encodeURIComponent(q)}&limit=10&page=1`),
	});

	const create = useMutation({
		mutationFn: (payload: { title: string; notes?: string }) =>
			api("/api/items", { method: "POST", body: JSON.stringify(payload) }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["items"] }),
	});

	return (
		<div className="max-w-2xl mx-auto p-6 space-y-4">
			{/* Top bar */}
			<div className="flex items-center justify-between">
				<Link to="/" className="text-xl font-bold">
					Fullstack Test
				</Link>
				<button
					className="border rounded px-3 py-1"
					onClick={() => {
						logout();
						nav("/", { replace: true });
					}}
				>
					Sign out
				</button>
			</div>

			<h1 className="text-2xl font-bold">Items</h1>
			<input
				className="border rounded px-3 py-2 w-full"
				placeholder="Search…"
				value={q}
				onChange={(e) => setQ(e.target.value)}
			/>
			<form
				className="flex gap-2"
				onSubmit={(e) => {
					e.preventDefault();
					const f = new FormData(e.currentTarget);
					create.mutate({ title: String(f.get("title") || "") });
					e.currentTarget.reset();
				}}
			>
				<input name="title" className="border rounded px-3 py-2 flex-1" placeholder="New item title" required />
				<button className="border rounded px-4">Add</button>
			</form>
			{isLoading ? (
				"Loading…"
			) : (
				<ul className="divide-y">
					{data?.items?.map((it: any) => (
						<li key={it.id} className="py-2">
							{it.title}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
