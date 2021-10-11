const areBookEquals = (book1, book2) => {
    return (
        book1.title === book2.title &&
        book1.subtitle === book2.subtitle &&
        book1.description === book2.description &&
        book1.author === book2.author &&
        book1.shortDescription === book2.shortDescription &&
        book1.image === book2.image &&
        book1.price === book2.price &&
        book1.promotion === book2.promotion
    );
};

const areBookArrayEquals = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (!areBookEquals(arr1[i], arr2[i])) {
            return false;
        }
    }

    return true;
};

module.exports = {
    areBookEquals,
    areBookArrayEquals,
};
