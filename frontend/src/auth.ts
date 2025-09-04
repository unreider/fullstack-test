const KEY = "auth_token";

export function setStoredToken(token: string | null) {
	if (token) localStorage.setItem(KEY, token);
	else localStorage.removeItem(KEY);
}

export function getStoredToken(): string | null {
	return localStorage.getItem(KEY);
}

export function isAuthed() {
	return !!getStoredToken();
}

// NEW: centralized logout
import { setToken } from "./api/client";
export function logout() {
	setToken(null);
}
