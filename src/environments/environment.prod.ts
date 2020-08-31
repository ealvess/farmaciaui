export const environment = {
  production: true,
  apiUrl: 'https://farmacia-api.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp('farmacia-api.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
