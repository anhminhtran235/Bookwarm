import { useQuery } from '@apollo/client';
import { useCallback, useRef } from 'react';
import { debounce } from 'lodash';

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

export const useDebouncedCallback = (callback, delay) => {
    const callbackRef = useRef();
    callbackRef.current = callback;
    return useCallback(
        debounce((...args) => callbackRef.current(...args), delay),
        []
    );
};
