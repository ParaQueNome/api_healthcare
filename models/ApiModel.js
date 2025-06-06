// apiModel.js
/**
 * @typedef {object} ApiData
 * @property {string} url - The URL of the API data.
 * @property {string} title - The title of the API data.
 * @property {string} lang - The language of the API data.
 * @property {string} [date] - The date of the API data.
 * @property {string} [metaTitle] - The meta title of the API data.
 * @property {string} [metaDescription] - The meta description of the API data.
 * @property {string} [excerpt] - The excerpt of the API data.
 * @property {string} [content] - The content of the API data.
 */

/**
 * Transforms the API data into a standardized model.
 *
 * @param {ApiData} apiData - The API data to transform.
 * @returns {object} - The transformed API data.
 */

const apiModel = (apiData) => {
    return {
        slug: apiData.url,
        title: apiData.title,
        lang: apiData.lang,
        date: apiData.date ?? undefined,
        metaTitle: apiData['meta-title'] ?? undefined,  // Correção
        metaDescription: apiData['meta-description'] ?? undefined,
        excerpt: apiData.excerpt ?? undefined,
        content: apiData.content ?? undefined
    }
}

module.exports = {
    apiModel
}