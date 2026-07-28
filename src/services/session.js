export const getSessionId = () => {
    let sessionId = localStorage.getItem("foodpicker_session_id");
    if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem("foodpicker_session_id", sessionId);
    }
    return sessionId;
};

export default getSessionId;
