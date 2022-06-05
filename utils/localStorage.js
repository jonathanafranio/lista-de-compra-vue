export default {
    get: (keys) => {
        return keys.reduce((acc, key) => {
            acc[key] = window ? window.localStorage.getItem(`${key}`) : null;
            return acc;
        }, {})
    },
    set: (values) => {
        Object.keys(values).forEach(key => {
            window ? window.localStorage.setItem(`${key}`, values[key]) : null;
        })
    },
    remove: (keys) => {
        keys.forEach(key => {
            window ? window.localStorage.removeItem(`${key}`) : null;
        })
    }
}