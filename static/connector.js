(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [
            {
                id: 'dateRep',
                dataType: tableau.dataTypeEnum.date,
            },
            {
                id: 'day',
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: 'month',
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: 'year',
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: 'cases',
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: 'deaths',
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: 'countriesAndTerritories',
                dataType: tableau.dataTypeEnum.string,
            },
            {
                id: 'geoId',
                dataType: tableau.dataTypeEnum.string,
            },
            {
                id: 'countryterritoryCode',
                dataType: tableau.dataTypeEnum.string,
            },
            {
                id: 'popData2019',
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: 'continentExp',
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: 'CumulativeCasesFor14DaysPer100000', // "Cumulative_number_for_14_days_of_COVID-19_cases_per_100000",
                dataType: tableau.dataTypeEnum.float,
                description:
                    'Cumulative number for 14 days of COVID-19 cases per 100,000',
            },
        ];

        var tableSchema = {
            id: 'myConnectorFeed',
            alias: 'Demo data received from Tableau WDC tutorial fork',
            columns: cols,
        };

        schemaCallback([tableSchema]);
    };

    myConnector.getData = function (table, doneCallback) {
        $.getJSON('/covid-data', function (data) {
            tableData = [];

            // Iterate over the JSON object
            for (var i = 0; i < data.length; i++) {
                tableData.push({
                    dateRep: data[i]['dateRep'],
                    day: data[i]['day'],
                    month: data[i]['month'],
                    year: data[i]['year'],
                    cases: data[i]['cases'],
                    deaths: data[i]['deaths'],
                    countriesAndTerritories: data[i]['countriesAndTerritories'],
                    geoId: data[i]['geoId'],
                    countryterritoryCode: data[i]['countryterritoryCode'],
                    popData2019: data[i]['popData2019'],
                    continentExp: data[i]['continentExp'],
                    CumulativeCasesFor14DaysPer100000:
                        data[i][
                            'Cumulative_number_for_14_days_of_COVID-19_cases_per_100000'
                        ],
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);
})();

$(document).ready(function () {
    $('#submitButton').click(function () {
        tableau.connectionName = 'COVID-19 Data Feed';
        tableau.submit();
    });
    $('#debugButton').click(function () {
        $.getJSON('/covid-data', (res) => {
            console.log(res);
        });
    });
});
