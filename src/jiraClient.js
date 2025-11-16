const axios = require('axios');
const FormData = require('form-data');
const { JIRA_BASE, JIRA_AUTH } = require('./config');

async function attachJiraAttachment(issueId, filename, buffer, contentType) {
  const form = new FormData();

  // Attach the file (binary)
  form.append('file', buffer, {
    filename: filename,
    contentType: contentType
  });

  const response = await axios({
    method: 'post',
    url: `${JIRA_BASE}/rest/api/3/issue/${issueId}/attachments`,
    headers: {
      Authorization: JIRA_AUTH,
      'X-Atlassian-Token': 'no-check',
      ...form.getHeaders()
    },
    data: form
  });

  return response;
}

module.exports = attachJiraAttachment;
