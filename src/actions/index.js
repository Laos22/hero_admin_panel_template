export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}
export const heroesDeleted = (id) => {
    return {
        type: 'HEROES_DELETED',
        payload: id
    }
}
export const heroAdd = (hero) => {
    return {
        type: 'HEROES_ADDED',
        payload: hero
    }
}
export const filterFetched = (filters) => {
    return {
        type: 'FILTERD_FETCHED',
        payload: filters
    }
}