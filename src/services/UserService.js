import { urlPrefix } from "../utils/config";
import axios from "axios";
const API_BASE_URL = urlPrefix + "/api/user";

class UserService {
    getLoggedInUserDetails() {
        return fetch(API_BASE_URL, {
            credentials: "include",
        });
    }

    searchUsers(queryText) {
        return fetch(`${API_BASE_URL}/search?query=${queryText}`, {
            credentials: "include",
        });
    }

    updateUserStatus(username,userDetails) {
        return fetch(`${urlPrefix}/api/user/${username}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(userDetails),
        });
    }
}

export default new UserService();
