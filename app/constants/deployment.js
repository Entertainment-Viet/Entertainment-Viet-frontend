export const deploymentUrl =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DOMAIN_DEV
    : process.env.REACT_APP_DOMAIN;
