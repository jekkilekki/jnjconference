// Using Express.JS
var express = require( 'express' );
var router = express.Router();

/**
 * Tickets Page Route ================================
 */
router.get( '/tickets', function( request, response ) {
    // var data = request.app.get( 'appData' );
    // var pageSpeakers = data.speakers;

    response.render( 'tickets', {
        pageTitle: 'Tickets',
        pageID: 'tickets',
        // speakers: pageSpeakers
    }); // views/index.ejs
});

module.exports = router;
