const API = import.meta.env.VITE_API_URL || "http://localhost:4000";
import { getStoredToken, setStoredToken } from "../auth";

let token: string | null = getStoredToken();

export const setToken = (t: string | null) => {
	token = t;
	setStoredToken(t);
};

export async function api(path: string, init?: RequestInit) {
	const res = await fetch(`${API}${path}`, {
		...init,
		headers: {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...(init?.headers || {}),
		},
	});
	if (!res.ok) {
		// Surface server JSON errors nicely
		const text = await res.text();
		throw new Error(text || res.statusText);
	}
	return res.json();
}
