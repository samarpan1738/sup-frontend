export const debounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
        console.log("timer : ", timer);
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
};
