# Tableau Web Data Connector for Global COVID-19 Data
This project serves COVID-19 data as a [Tableau Web Data Connector](https://help.tableau.com/current/pro/desktop/en-gb/examples_web_data_connector.htm) (WDC) to be used in Tableau applications as an automated data source.

## Data
The data is provided and owned by *European Centre for Disease Prevention and Control* (ECDC). The source can be found [here](https://www.ecdc.europa.eu/en/publications-data/download-todays-data-geographic-distribution-covid-19-cases-worldwide). Please also note to the [ECDC's copyright policy](https://www.ecdc.europa.eu/en/copyright).

The data is updated by ECDC daily.

## How it works
Since the ECDC's website uses CORS to prevent fetching the data directly, this Express server loads the dataset periodically and stores it locally for further processing.

Since a Tableau WDC is set up as frontend, the server has it's own implemented `GET` endpoint at `/covid-data` serving JSON data.

To use a WDC in a Tableau workbook, please see the corresponding [Tableau Docs](https://tableau.github.io/webdataconnector/docs/wdc_use_in_tableau.html).

## Usage
- Clone the repo: `git clone https://github.com/sarcaustech/tableau-wdc-covid`
- Using Node directly: Run `npm start`
- Using Docker: 
  - Build with `docker build -t tableau-wdc-covid .`
  - Run with `docker run --rm -it -p 8080:8080 -v $PWD/data:/app/data tableau-wdc-covid`
- Using Docker Compose: `docker-compose up`
- The WDC is available at [http://localhost:8080](http://localhost:8080)

