const express = require( 'express' );
const router = express.Router();

module.exports = () => {
  router.get( '/', (req, res, next ) => {
    // return res.render( 'conduct', {
    //   page: 'Code of Conduct',
    //   pageId: 'conduct'
    // });

    return res.redirect( 'https://live.kotesolconf.com/code-of-conduct/' );
  });

  return router;
}