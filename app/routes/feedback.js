// Using Express.JS
var express = require( 'express' );
var router = express.Router();

/**
 * Homepage Route ================================
 */
router.get( '/feedback', function( request, response ) {
    var data = request.app.get( 'appData' );
    var pageSpeakers = data.speakers;
    var feedback = data.buzz;

    response.render( 'feedback', {
        pageTitle: 'Feedback',
        pageID: 'feedback',
        buzz: feedback
    }); // views/index.ejs
});

module.exports = router;
