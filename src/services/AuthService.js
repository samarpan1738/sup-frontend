import { urlPrefix } from "../utils/config";
const API_BASE_URL = urlPrefix + "/api/auth";

class AuthService {
    createUser(user) {
        return fetch(`${API_BASE_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(user),
        });
    }
    loginUser(credentials) {
        return fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(credentials),
        });
    }
    logoutUser() {
        return fetch(`${API_BASE_URL}/logout`, {
            method: "GET",
            credentials: "include",
        });
    }
}

export default new AuthService();
