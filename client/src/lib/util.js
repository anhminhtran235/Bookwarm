export const toDataURL = (file) => {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                resolve(reader.result);
            };
        } catch (error) {
            reject(error);
        }
    });
};
