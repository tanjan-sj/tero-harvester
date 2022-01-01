const express = require('express');
const router = express.Router();
const { getCoin } = require('../services/coin');
const { getUniqueDatesAndUniqueKeys } = require('../utils/helper');
const {
  uniqueKeySeparator,
  eur,
  usd,
  noDataAvailable,
  notApplicable
} = require('../utils/constant');

router.post('/getData', async function (req, res, next) {
  try {
    const { uniqueDates, uniqueKeys } = await getUniqueDatesAndUniqueKeys(
      req.body
    );
    const resultObject = await getCoin(uniqueDates);

    const responseBody = {};

    for (const key of uniqueKeys) {
      const coinName = key.split(uniqueKeySeparator)[0];
      const coinDate = key.split(uniqueKeySeparator)[1];

      const coinData = resultObject[coinDate];

      if (!responseBody.hasOwnProperty(coinName)) {
        responseBody[coinName] = {};
      }

      if (coinData) {
        if (
          !coinData.hasOwnProperty(coinName + '_' + usd) &&
          !coinData.hasOwnProperty(coinName + '_' + eur)
        ) {
          responseBody[coinName][coinDate] = noDataAvailable;
        } else {
          responseBody[coinName][coinDate] = {
            [usd]: (coinData[coinName + '_' + usd] ? parseFloat(coinData[coinName + '_' + usd]) : notApplicable),
            [eur]: (coinData[coinName + '_' + eur] ? parseFloat(coinData[coinName + '_' + eur]) : notApplicable),
          };
        }
      } else {
        responseBody[coinName][coinDate] = noDataAvailable;
      }
    }
    res.status(200).json(responseBody);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
});

module.exports = router;
