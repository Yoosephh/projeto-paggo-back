/* eslint-disable prettier/prettier */
const { createWorker } = require('tesseract.js');

(async () => {
  const worker = await createWorker([
    'eng',
    'por',
    'spa',
    'jpn',
    'deu',
  ], 3, {
    logger: m => console.log(m),
  });  
  const { data: {text} } = await worker.recognize('./e7af19a011559196505f0068c2462658.jpg');
  await worker.terminate();
  return text
})()
