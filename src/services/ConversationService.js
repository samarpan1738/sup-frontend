import { urlPrefix } from "../utils/config";
const API_BASE_URL = urlPrefix + "/api/conversations";

class ConversationService {
    createGroup(groupDetails) {
        return fetch(API_BASE_URL, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(groupDetails),
        });
    }

    markConversationMessagesAsRead(conversationId, messageIds) {
        return fetch(`${API_BASE_URL}/${conversationId}/messages/markRead`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(messageIds),
        });
    }

    deleteAllMessagesInConversation(conversationId) {
        return fetch(`${API_BASE_URL}/${conversationId}/messages`, {
            method: "delete",
            credentials: "include",
        });
    }

    getAllConversations() {
        return fetch(API_BASE_URL, {
            credentials: "include",
        });
    }

    createContact(contactDetails) {
        return fetch(API_BASE_URL, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(contactDetails),
        });
    }
}

export default new ConversationService();
