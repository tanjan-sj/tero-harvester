const fireStore = require("firebase/firestore/lite");
const db = require("../config/firebase");
const { coinCollection } = require("../utils/constant");
const _ = require('lodash');

const getCoin = async (coinDates) => {
    const coinsRef = fireStore.collection(db, coinCollection);
    let returnObject = {};

    const queryResult = await Promise.all(
        _.chunk(coinDates, 10).map(async (chunkIds) => {
            const harvester = await fireStore.getDocs(
                fireStore.query(
                    coinsRef,
                    fireStore.where(fireStore.documentId(), 'in', chunkIds)
                ));
            
            return harvester.docs.filter(doc => doc.exists()).map((doc) => {
                let data = doc.data();
                data['date'] = doc.id;
                return data;
            });
        })
    );
    
    for(const element of _.flatten(queryResult)){
        returnObject[element['date']] = element;
    }

    return returnObject;
}

module.exports = {
    getCoin
}