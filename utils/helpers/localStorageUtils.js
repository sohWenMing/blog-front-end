class localStorateUtils {
    setItem(key, item) {
        const jsonDataString = JSON.stringify(item);
        return window.localStorage.setItem(key, jsonDataString);
    }
    getItem(key) {
        const jsonDataString = window.localStorage.getItem(key);
        const data = JSON.parse(jsonDataString);
        return data;
    }
    removeItem(key) {
        return window.localStorage.removeItem(key);
    }
}

const localStorageUtils = new localStorateUtils();
export default localStorageUtils;