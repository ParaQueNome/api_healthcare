const axios = require('axios');
const {apiConfig} = require('../config/ApiConfig');

/**
 * Fetches data from the specified URL.
 *
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<any>} - The fetched data.
 * @throws {Error} - If an error occurs during the fetch.
 */
const fetchData = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Maps the data using the provided mapper function.
 *
 * @param {Array<any>} data - The data to map.
 * @param {function} mapper - The mapper function.
 * @returns {Array<any>} - The mapped data.
 */
const mapData = (data, mapper) => {
    return data.map(mapper);
}

/**
 * Retrieves data from the API based on the provided slug and request type.
 *
 * @param {SlugRequest} [slugRequest] - The slug request object.
 * @param {string} requestType - The type of request ('glossary', 'article', 'glossaries', 'articles').
 * @returns {Promise<object>} - The API response.
 */
const apiService = async (slugRequest, requestType) => {
    try {
        const config = apiConfig(slugRequest, requestType);

        if (!config) {
            return { status: 400, data: { message: 'Invalid request type' } };
        }

        const apiData = await fetchData(config.url);

        if (!apiData) {
            return { status: 404, data: { message: 'Data not found' } };
        }

        let items;

        if (config.propertyName) {
            items = mapData(apiData[config.propertyName], config.mapper);
        } else {
            items = [config.mapper(apiData)];
        }

        const itemsCount = items.length;

        return { status: 200, data: { itemsCount, [requestType]: items } };
    } catch (error) {
        return { status: 500, data: { message: `An internal server error occurred: ${error}` } };
    }
};

module.exports = {
    apiService
}