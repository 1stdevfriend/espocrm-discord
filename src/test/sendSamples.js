const axios = require('axios');
const samples = require('./webhookSamples');

const BASE_URL = 'http://localhost:3000'; // Change if your server runs on a different port

async function sendSample(entity, event, data) {
  const url = `${BASE_URL}/${entity.toLowerCase()}/${event}`;
  try {
    const res = await axios.post(url, [data]); // Send as array
    console.log(`✅ Sent ${entity} ${event}:`, res.data.message);
  } catch (err) {
    console.error(`❌ Error sending ${entity} ${event}:`, err.response?.data || err.message);
  }
}

(async () => {
  for (const [entity, events] of Object.entries(samples)) {
    for (const [event, data] of Object.entries(events)) {
      await sendSample(entity, event, data);
    }
  }
  console.log('All samples sent!');
})(); 