

export default class LocalStorage {
    static setStorage(key, auth) {
        try {
            const item = JSON.stringify(auth);
            localStorage.setItem(key, item);
        }
        catch(err) {
            console.error(err);
        }
    }

    static getStorage(key) {
        try {
            const item = localStorage.getItem(key);
            if(item)
            return JSON.parse(item);
        }
        catch (err) {
            console.error(err);
        }

    }
    static clearStorage(key) {
        try {
            localStorage.removeItem(key);
            
        }
        catch (err) {
            console.error(err);
        }

    }
}