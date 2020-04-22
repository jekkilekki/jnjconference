const express = require( 'express' );
const router = express.Router();

module.exports = () => {
  router.get( '/', (req, res, next ) => {
    // return res.render( 'sponsors', {
    //   page: 'Sponsors',
    //   pageId: 'sponsors'
    // });

    return res.redirect( 'https://live.kotesolconf.com/sponsors/' );
  });

  return router;
}