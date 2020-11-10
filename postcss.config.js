// allow importing devDependencies
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-disable global-require */

module.exports = {
  plugins: [
    // Disable Flexbox 2009 syntax ("display: -webkit-box;") because it breaks
    // Safari 8 (and maybe earlier).
    require('autoprefixer')({flexbox: 'no-2009'}),
  ],
};
