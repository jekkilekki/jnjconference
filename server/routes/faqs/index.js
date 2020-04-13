const express = require( 'express' );
const router = express.Router();

module.exports = () => {
  router.get( '/', (req, res, next ) => {
    // return res.render( 'faqs', {
    //   page: 'FAQs',
    //   pageId: 'faqs'
    // });

    return res.redirect( 'https://live.kotesolconf.com/faqs/' );
  });

  return router;
}