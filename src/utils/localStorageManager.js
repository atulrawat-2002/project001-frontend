export const KEY_ACCESS_TOKEN = "access_token";

export const setItem = (key, value) => {
    localStorage.setItem(key, value);
}


export const getItem = (key) => {
    const item = localStorage.getItem(key);

    return item;
}

export const removeItem = (key) => {
    localStorage.removeItem(key);
}