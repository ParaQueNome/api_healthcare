
/**
 * @typedef {object} SlugRequest
 * @property {string} base - The base part of the slug.
 * @property {string} item - The item part of the slug.
 */



const baseUrl = 'https://www.healthcare.gov/';
const { apiModel} = require('../models/ApiModel');

/**
 * Configures the API request based on the provided slug and request type.
 *
 * @param {SlugRequest} [slugRequest] - The slug request object.
 * @param {string} requestType - The type of request ('glossary', 'article', 'glossaries', 'articles').
 * @returns {object} - The API configuration object.
 */
const apiConfig = (slugRequest, requestType) =>  {
    if (slugRequest) { 
        if (requestType === 'glossary') {
            return {url: `${baseUrl}${slugRequest.base}/${slugRequest.item}.json` , 
            mapper: ({url: slug, title, lang, date, metaTitle, metaDescription, excerpt, content }) => apiModel({slug, title, lang, date, metaTitle, metaDescription, excerpt, content}),};
        }
        if ( requestType === 'article') {
            return {url: `${baseUrl}${slugRequest.base}/${slugRequest.item}.json`,
            mapper: ({url: slug, title, lang, metaTitle, metaDescription,excerpt, content}) => apiModel({slug, title, lang, metaTitle, metaDescription, excerpt, content}),
            };
        }
    } else { 
        if(requestType === 'glossaries') {
            return { 
                url: `${baseUrl}/api/glossary.json`,
                mapper: (item) => apiModel({url: item.url, title: item.title, lang: item.lang, date: item.date}),
                propertyName: 'glossary'
            };
        }
        if(requestType === 'articles') {
            return {
                url: `${baseUrl}/api/articles.json`,
                mapper: (item) => apiModel({url: item.url, title: item.title, lang: item.lang}),
                propertyName: 'articles'
            };
        }
    }
};

module.exports = {
    apiConfig
}