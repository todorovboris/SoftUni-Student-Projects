import { useEffect, useState } from 'react';
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

export const useComments = (gameId) => {
    const { request } = useAuthorization();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const searchParams = new URLSearchParams({
            where: `gameId="${gameId}"`,
        });

        request.get(`${baseUrl}?${searchParams.toString()}`).then(setComments);
    }, [gameId]);

    return { comments, setComments };
};

export const useCreateComment = () => {
    const { userId, request } = useAuthorization();

    const create = (gameId, comment) => {
        const commentData = {
            gameId,
            comment,
        };

        return request.post(baseUrl, commentData);
    };

    return { create };
};
