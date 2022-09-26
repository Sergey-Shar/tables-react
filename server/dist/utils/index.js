"use strict";
const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, index) => index + start);
};
module.exports = range;
