
function generateCustomId(prefix, sequenceNumber) {
  
  const padded = String(sequenceNumber).padStart(4, '0');
  return `${prefix}-${padded}`;
}

module.exports = { generateCustomId };
