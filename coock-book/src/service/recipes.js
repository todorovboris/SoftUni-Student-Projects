const baseUrl = 'http://localhost:3030/data/recipes';

export const recipes = {
    getAll(filter) {
        const seaerchParams = new URLSearchParams();

        if (filter.search) {
            seaerchParams.set('where', `name LIKE "${filter.search}"`);
        }

        return fetch(`${baseUrl}?${seaerchParams.toString()}`)
            .then((response) => response.json())
            .then((data) => Object.values(data));
    },
    getRecent() {
        const query = new URLSearchParams({
            // write only "_createdOn" if you want to be asc;
            sortBy: '_createdOn desc',
            pageSize: 3,
        });
        return fetch(`${baseUrl}?${query.toString()}`)
            .then((response) => response.json())
            .then((data) => Object.values(data));
    },
    getOne(id) {
        return fetch(`${baseUrl}/${id}`).then((response) => response.json());
    },
};
