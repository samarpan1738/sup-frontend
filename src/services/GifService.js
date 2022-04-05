import { urlPrefix } from "../utils/config";
import axios from "axios";
const API_BASE_URL = urlPrefix + "/api/gif";

class GifService {
    getTrendingGifs(limit = 30) {
        return fetch(`${API_BASE_URL}/trending?limit=${limit}`, {
            credentials: "include",
        });
    }
}

export default new GifService();
