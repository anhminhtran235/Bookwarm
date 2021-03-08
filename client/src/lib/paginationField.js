import { GET_BOOK_PAGINATION_META_QUERY } from './graphql';

export default function paginationField() {
    return {
        keyArgs: false,
        read(existing = [], { args, cache }) {
            const { skip, limit } = args;
            if (!skip && !limit) {
                return existing;
            }

            const data = cache.readQuery({
                query: GET_BOOK_PAGINATION_META_QUERY,
            });
            const count = data?.count;
            const page = skip / limit + 1;
            const pages = Math.ceil(count / limit);

            const items = existing.slice(skip, skip + limit).filter((x) => x);
            if (items.length !== limit && page !== pages) {
                return false;
            } else {
                return items;
            }
        },
        merge(existing, incoming, { args }) {
            const { skip, limit } = args;
            console.log(
                'Merging ' + incoming.length + ' items from the network'
            );
            const merged = existing ? existing.slice(0) : [];
            for (let i = skip; i < skip + incoming.length; i++) {
                merged[i] = incoming[i - skip];
            }
            return merged;
        },
    };
}
