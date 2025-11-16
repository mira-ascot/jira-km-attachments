require('dotenv').config();
//Read environment variables and transfer to process.env
function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

module.exports = {
  PORT: process.env.PORT || 3000,
  JIRA_BASE: required('JIRA_BASE'),
  JIRA_AUTH: required('JIRA_AUTH'),
  INFOBIP_BASE: required('INFOBIP_BASE'),
  INFOBIP_KEY: required('INFOBIP_KEY'),
  SENDER: required('SENDER')
};
