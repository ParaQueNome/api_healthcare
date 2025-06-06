const express = require('express');
const router = express.Router();
const { apiService} = require('../services/ApiService');


/**
 * @route GET /articles
 * @group Articles - Operations related to articles
 * @returns {object} 200 - An array of articles
 * @returns {Error} 404 - Ops! The page you are trying to access does not exist
 * @returns {Error} 500 - Internal server error, try it later
 */
router.get('/articles', async(req, res) => {
    try { 
        const response = await apiService( undefined, 'articles')
        if( response.status === 404) {
            return res.status(404).json('Ops! The page you are trying to acces does not exists');
        }
        res.json(response.data);
    } catch (error) {
        res.status(500).json({message: `Internal server error, try it later: ${error}`});
    }
}); 

/**
 * @route GET /{base}/{item}
 * @group Articles - Operations related to articles
 * @param {string} base.path.required - Base part of the URL
 * @param {string} item.path.required - Item part of the URL
 * @returns {object} 200 - A single article item
 * @returns {Error} 404 - Ops! The page you are trying to access does not exist
 * @returns {Error} 500 - Internal server error, try it later
 */
router.get('/:base/:item', async(req, res) => {

    try {
        const response = await apiService(req.params, 'glossary');
        if (response.status === 404) {
            return res.status(404).json('Ops! The page you are trying to access does not exists');
        }
    res.json(response.data);
    } catch (error) {
        res.status(500).json({message: `Internal server error, try it later: ${error}`});
    }
});


module.exports = router;