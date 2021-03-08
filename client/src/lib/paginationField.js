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
            const count = data?.getBookPaginationMeta.count;
            const page = skip / limit + 1;
            const pages = Math.ceil(count / limit);
            const lastPageCount = count - limit * (pages - 1);

            const items = existing.slice(skip, skip + limit).filter((x) => x);
            if (page !== pages && items.length !== limit) {
                return false;
            } else if (page === pages && items.length !== lastPageCount) {
                return false;
            } else {
                return items;
            }
        },
        merge(existing, incoming, { args }) {
            const { skip, limit } = args;
            if (!skip && !limit) {
                return incoming;
            }

            const merged = existing ? existing.slice(0) : [];
            for (let i = skip; i < skip + incoming.length; i++) {
                merged[i] = incoming[i - skip];
            }
            return merged;
        },
    };
}
