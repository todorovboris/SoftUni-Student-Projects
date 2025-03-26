import { useEffect, useReducer, useState } from 'react';
import useAuthorization from '../hooks/useAuth.js';

const baseUrl = 'http://localhost:3030/data/comments';

// export default {
//     async getAll(gameId) {
//         const comments = await request.get(baseUrl);

//         //TODO: filter when migrate to collections
//         //* Client filter(do not):
//         const gameComments = Object.values(comments).filter((comment) => comment.gameId == gameId);

//         return gameComments;
//     },
//     create(email, gameId, comment) {
//         return request.post(baseUrl, { email, gameId, comment });
//     },
// };

function commentsReducer(state, action) {
    switch (action.type) {
        case 'ADD_COMMENT':
            return [...state, action.payload];
        case 'GET_ALL':
            return action.payload;
        default:
            return state;
    }
}

export const useComments = (gameId) => {
    const { request } = useAuthorization();
    // const [comments, setComments] = useState([]);
    const [comments, dispatch] = useReducer(commentsReducer, []);

    useEffect(() => {
        const searchParams = new URLSearchParams({
            where: `gameId="${gameId}"`,
            load: `author=_ownerId:users`,
        });

        request.get(`${baseUrl}?${searchParams.toString()}`).then((result) => dispatch({ type: 'GET_ALL', payload: result }));
    }, [gameId]);

    return { comments, addComment: (commentData) => dispatch({ type: 'ADD_COMMENT', payload: commentData }) };
};

export const useCreateComment = () => {
    const { request } = useAuthorization();

    const create = (gameId, comment) => {
        const commentData = {
            gameId,
            comment,
        };

        return request.post(baseUrl, commentData);
    };

    return { create };
};
