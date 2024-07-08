const getAxiosStatus = (error) => {
    if (error.response) {
        return error.response.status;
    }
    return false;
};

export { getAxiosStatus };