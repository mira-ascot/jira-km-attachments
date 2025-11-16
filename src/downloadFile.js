const axios = require('axios');
const { INFOBIP_BASE, INFOBIP_KEY, SENDER } = require('./config');

async function downloadMedia(mediaId) {
  const response = await axios({
    method: 'get',
    url: `${INFOBIP_BASE}/whatsapp/1/senders/${SENDER}/media/${mediaId}`,
    headers: {
      'Authorization': `App ${INFOBIP_KEY}`,
      'Accept': 'application/json'
    },
    responseType: 'arraybuffer'
  });

  const buffer = response.data;
  const contentType = response.headers['content-type'];

  return { buffer, contentType };
}

module.exports = downloadMedia;
