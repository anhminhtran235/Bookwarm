import { useQuery } from '@apollo/client';

import { GET_ME_QUERY } from './graphql';

export const toDataURL = (file) => {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                resolve(reader.result);
            };
        } catch (error) {
            reject(error);
        }
    });
};

export const useUser = () => {
    const { data } = useQuery(GET_ME_QUERY);
    return data?.getMe;
};
