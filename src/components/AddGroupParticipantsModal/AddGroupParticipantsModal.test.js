import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { shallow } from "enzyme";
import { useSelector,Provider } from "react-redux";
import AddGroupParticipantsModal from "./AddGroupParticipantsModal";
import configureMockStore from "redux-mock-store";
import Option from "../AddGroupParticipantsModal/Option";
let container = null;

const mockState = {
    conversations: {
        1: {
            users: {
                2: {
                    name: "John Constantine",
                    id: 2,
                    username: "johnconstantine",
                    last_active: "2021-12-25T18:40:31.172Z",
                    profile_pic_uri: "https://avatars.dicebear.com/api/pixel-art/john.svg",
                    status: "Hey there! I'm using Sup",
                },
            },
            type: "CONTACT",
            title: null,
            hash: "MTI=",
            id: 1,
            description: null,
            createdBy: {
                id: 2,
            },
            createdAt: "2021-12-25T18:40:40.621Z",
            conversationIconUrl: "https://avatars.dicebear.com/api/identicon/seed.svg",
            unreadCounter: 0,
            messages: {},
        },
        2: {
            users: {
                2: {
                    name: "John Constantine",
                    id: 2,
                    username: "johnconstantine",
                    last_active: "2021-12-25T18:40:31.172Z",
                    profile_pic_uri: "https://avatars.dicebear.com/api/pixel-art/john.svg",
                    status: "Hey there! I'm using Sup",
                },
            },
            type: "GROUP",
            title: "Test Group",
            hash: null,
            id: 2,
            description: "Here we test things out ",
            createdBy: {
                id: 1,
            },
            createdAt: "2021-12-26T09:48:18.849Z",
            conversationIconUrl: "https://avatars.dicebear.com/api/identicon/seed.svg",
            unreadCounter: 0,
            messages: {
                "2021-12-29": {
                    3: {
                        id: 3,
                        text: "hi",
                        file_uri: null,
                        type: "TEXT",
                        sender_id: 1,
                        conversation_id: 2,
                        createdAt: "2021-12-29T13:44:15.913Z",
                        read: true,
                    },
                    4: {
                        id: 4,
                        text: "yo",
                        file_uri: null,
                        type: "TEXT",
                        sender_id: 1,
                        conversation_id: 2,
                        createdAt: "2021-12-29T13:44:26.526Z",
                        read: true,
                    },
                },
                "2022-04-02": {
                    17: {
                        id: 17,
                        text: "Hi",
                        file_uri: null,
                        type: "TEXT",
                        sender_id: 1,
                        conversation_id: 2,
                        createdAt: "2022-04-02T15:03:02.439Z",
                        read: true,
                    },
                    18: {
                        id: 18,
                        text: "Hi",
                        file_uri: null,
                        type: "TEXT",
                        sender_id: 2,
                        conversation_id: 2,
                        createdAt: "2022-04-02T15:03:46.515Z",
                        read: true,
                    },
                },
            },
        },
        3: {
            users: {
                3: {
                    name: "David",
                    id: 3,
                    username: "dave",
                    last_active: "2021-12-29T12:59:30.545Z",
                    profile_pic_uri: "https://avatars.dicebear.com/api/pixel-art/dave.svg",
                    status: "Hey there! I'm using Sup",
                },
            },
            type: "CONTACT",
            title: null,
            hash: "MTM=",
            id: 3,
            description: null,
            createdBy: {
                id: 3,
            },
            createdAt: "2021-12-29T13:00:09.403Z",
            conversationIconUrl: "https://avatars.dicebear.com/api/identicon/seed.svg",
            unreadCounter: 0,
            messages: {
                "2021-12-30": {
                    5: {
                        id: 5,
                        text: "Hi",
                        file_uri: null,
                        type: "TEXT",
                        sender_id: 1,
                        conversation_id: 3,
                        createdAt: "2021-12-30T06:20:09.475Z",
                        read: true,
                    },
                },
            },
        },
        5: {
            users: {
                4: {
                    name: "Party Monster",
                    id: 4,
                    username: "partymonster",
                    last_active: "2022-01-01T08:28:40.414Z",
                    profile_pic_uri: "https://avatars.dicebear.com/api/pixel-art/partymonster.svg",
                    status: "I'm a party animal",
                },
            },
            type: "CONTACT",
            title: null,
            hash: "MTQ=",
            id: 5,
            description: null,
            createdBy: {
                id: 4,
            },
            createdAt: "2022-01-01T08:33:33.508Z",
            conversationIconUrl: "https://avatars.dicebear.com/api/identicon/seed.svg",
            unreadCounter: 0,
            messages: {
                "2022-01-01": {
                    6: {
                        id: 6,
                        text: "hi",
                        file_uri: null,
                        type: "TEXT",
                        sender_id: 4,
                        conversation_id: 5,
                        createdAt: "2022-01-01T08:34:12.201Z",
                        read: true,
                    },
                    7: {
                        id: 7,
                        text: "hi",
                        file_uri: null,
                        type: "TEXT",
                        sender_id: 4,
                        conversation_id: 5,
                        createdAt: "2022-01-01T08:42:28.224Z",
                        read: true,
                    },
                    8: {
                        id: 8,
                        text: "hi",
                        file_uri: null,
                        type: "TEXT",
                        sender_id: 4,
                        conversation_id: 5,
                        createdAt: "2022-01-01T08:42:43.999Z",
                        read: true,
                    },
                    9: {
                        id: 9,
                        text: "hi",
                        file_uri: null,
                        type: "TEXT",
                        sender_id: 4,
                        conversation_id: 5,
                        createdAt: "2022-01-01T08:46:13.364Z",
                        read: true,
                    },
                    10: {
                        id: 10,
                        text: "hi",
                        file_uri: null,
                        type: "TEXT",
                        sender_id: 4,
                        conversation_id: 5,
                        createdAt: "2022-01-01T08:48:51.525Z",
                        read: true,
                    },
                    11: {
                        id: 11,
                        text: "hi",
                        file_uri: null,
                        type: "TEXT",
                        sender_id: 4,
                        conversation_id: 5,
                        createdAt: "2022-01-01T08:50:24.568Z",
                        read: true,
                    },
                    12: {
                        id: 12,
                        text: "hi",
                        file_uri: null,
                        type: "TEXT",
                        sender_id: 4,
                        conversation_id: 5,
                        createdAt: "2022-01-01T08:52:34.440Z",
                        read: true,
                    },
                    13: {
                        id: 13,
                        text: "hi",
                        file_uri: null,
                        type: "TEXT",
                        sender_id: 4,
                        conversation_id: 5,
                        createdAt: "2022-01-01T08:54:52.413Z",
                        read: true,
                    },
                    14: {
                        id: 14,
                        text: "hi",
                        file_uri: null,
                        type: "TEXT",
                        sender_id: 4,
                        conversation_id: 5,
                        createdAt: "2022-01-01T09:27:37.795Z",
                        read: true,
                    },
                    15: {
                        id: 15,
                        text: "hi",
                        file_uri: null,
                        type: "TEXT",
                        sender_id: 4,
                        conversation_id: 5,
                        createdAt: "2022-01-01T09:29:05.443Z",
                        read: true,
                    },
                },
                "2022-01-08": {
                    16: {
                        id: 16,
                        text: "hi",
                        file_uri: null,
                        type: "TEXT",
                        sender_id: 1,
                        conversation_id: 5,
                        createdAt: "2022-01-08T15:00:23.702Z",
                        read: true,
                    },
                },
            },
        },
    },
};

const mockStore = configureMockStore()(mockState);
// const useSelector=jest.fn();
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
}));

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

// it("renders with or without a name", () => {
//     act(() => {
//         render(
//             <Provider store={mockStore}>
//                 <AddGroupParticipantsModal currentConversationId={1} />
//             </Provider>,
//             container
//         );
//     });
//     expect(container.querySelectorAll(".option").length).toBe(2);
// });

// function MockProvider(props) {
//     const { children, mockStore } = props;

//     return <Provider store={mockStore}>{children}</Provider>;
// }

// MockProvider.defaultProps = {
//     children: null,
//     mockStore,
// };

describe("<AddGroupParticipantsModal />", () => {
    beforeEach(() => {
        useSelector.mockImplementation((callback) => {
            return callback(mockState);
        });
    });
    afterEach(() => {
        useSelector.mockClear();
    });
    it("renders without errors", () => {
        const wrapper = shallow(<AddGroupParticipantsModal currentConversationId={1} />);
        console.log("wrapper.props() : ", wrapper.props());
        // console.log("wrapper.state() : ", wrapper.state());
        // console.log("options in test : ", wrapper.);
        expect(wrapper.find(Option).length === 0).toBeTruthy();
        // expect(wrapper.ge).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
    });
});
