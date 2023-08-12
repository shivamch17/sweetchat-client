import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  ROOM_REQUEST,
  ROOM_SUCCESS,
  ROOM_FAIL,
  GET_chat_SUCCESS,
  GET_chat_REQUEST,
  GET_chat_FAIL,
  ADD_MULTIPLE_MESSAGES,
  POST_MESSAGE_SUCCESS,
  CHECK_LOGGIN,
} from "../constants/userConstants";

export const userReducer = (state = { user: {} }, { type, payload }) => {
  switch (type) {
    case LOGIN_USER_REQUEST:
      return {
        isAuthenticated: false,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: payload,
      };
    case CHECK_LOGGIN:
      return {
        ...state,
        isAuthenticated: payload,
      };
    default:
      return state;
  }
};

export const roomReducer = (state = { room: {} }, { type, payload }) => {
  switch (type) {
    case ROOM_REQUEST:
      return {
        isRoom: false,
      };
    case ROOM_SUCCESS:
      return {
        ...state,
        isRoom: true,
        room: payload,
      };
    case ROOM_FAIL:
      return {
        ...state,
        isRoom: false,
        room: null,
        error: payload,
      };
    case CHECK_LOGGIN:
      return {
        ...state,
        isRoom: payload,
      };
    default:
      return state;
  }
};

export const chatReducer = (state = { chat: {}}, { type, payload ,createdAt}) => {
  // console.log("inreducer",createdAt);
        switch (type) {
          case GET_chat_REQUEST:
                return {
                    timestamp: 0,
                };
            case GET_chat_SUCCESS:
                return {
                    chat: payload,
                    timestamp: createdAt,
                };
                case POST_MESSAGE_SUCCESS:
                    return {
                      ...state,
                        chat: [...state.chat, payload],
                        timestamp: createdAt
                    };
                    case ADD_MULTIPLE_MESSAGES:
                        return {
                          ...state,
                      chat: [...state.chat, ...payload],
                      timestamp: createdAt
                    };
        case GET_chat_FAIL:
            return {
                ...state,
                chat: null,
                error: payload,
            };
            default:
                return {...state,
                timestamp: createdAt
              }
  }
};
