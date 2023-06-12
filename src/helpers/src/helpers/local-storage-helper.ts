const getItem = (key: string): string | null => {
    return localStorage.getItem(key);
};

const setItem = (key: string, value: string | null) => {
    if (value) {
        localStorage.setItem(key, value);
    }
};

const removeItem = (key = 'accessToken') => {
    localStorage.removeItem(key);
};

const clearStorage = () => {
    localStorage.clear();
}

export { getItem, setItem, removeItem, clearStorage };