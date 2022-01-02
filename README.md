# Tero Harvester

This API accepts a JSON request body with coin names as keys & an array of YYYY-MM-DD dates as their respective values. It pulls data from a firestore database and displays the coin price data(**EUR** and **USD**).

## Sample Request & Response

The request body might look like this -
```json
{
"bitcoin": ["2021-01-01", "2021-11-23", "2021-11-24", "2021-11-25", "2021-11-26", "2021-11-27", "2021-11-28", "2021-01-02", "2021-01-03", "2021-01-04", "2021-01-05"],
"celo": ["2021-12-23"],
"abcd" : ["2021-01-23"],
"solana": ["2021-1-23"]
}
```

The response for the above request will look like this -
```json
{
    "bitcoin": {
        "2021-01-01": {
            "USD": 29022.41839530417,
            "EUR": 23758.680415784707
        },
        "2021-11-23": {
            "USD": 56386.856853152145,
            "EUR": 50150.63964576414
        },
        "2021-11-24": {
            "USD": 57748.79317378856,
            "EUR": 51358.946957902095
        },
        "2021-11-25": {
            "USD": 57198.18384629529,
            "EUR": 51049.32188463475
        },
        "2021-11-26": {
            "USD": 58897.84698299794,
            "EUR": 52548.07009976099
        },
        "2021-11-27": {
            "USD": 53827.792865034724,
            "EUR": 47551.04159462869
        },
        "2021-11-28": {
            "USD": 54533.40388242691,
            "EUR": 48174.372722504864
        },
        "2021-01-02": {
            "USD": 29352.12679194895,
            "EUR": 24106.90173422772
        },
        "2021-01-03": {
            "USD": 32163.824935335215,
            "EUR": 26505.018067687164
        },
        "2021-01-04": {
            "USD": 33008.226203489285,
            "EUR": 26944.846107491692
        },
        "2021-01-05": {
            "USD": 31515.575966658354,
            "EUR": 25728.49681420476
        }
    },
    "celo": {
        "2021-12-23": "No Data Available"
    },
    "abcd": {
        "2021-01-23": "No Data Available"
    }
}
```

## Additional Notes

- In case a date or a coin is provided that does not exist, the response will contain *No Data Available* text.
- If either **USD** or **EUR** information is missing in the database for a specific coin and date, the response will contain *N/A* text.
- The date must be formatted as **YYYY-MM-DD**. In case of differently formatted date for a coin, no data will be displayed.


## Build Instructions

- Clone the git repo by running the following command in your terminal - 
```
git clone git@github.com:tanjan-sj/tero-harvester.git
```
- Run the following command to install the dependencies -
```
npm i
```
- Create your own `.env` file by reffering to the **example.env** file and add your own Firebase credentials. 
- Collect data from ***harvester*** firestore database, which was created for testing purpose
- Run the project -
```
npm start
```

