'use strict';

var url = "https://restcountries.eu/rest/v2/name/";
var countriesList = document.getElementById('countries');

document.getElementById('search').addEventListener('click', searchCountries);

//enter
document.querySelector('#country-name').addEventListener('keyup', function (e) {
    if (e.keyCode == 13) {
        searchCountries();
    }
});

// Function fetch countries data
function searchCountries() {
    var countryName = document.getElementById('country-name').value;
    if (!countryName.length) countryName = 'Poland';
    fetch(url + countryName)
        .then(function (resp) {
            return resp.json();
        })
        .then(showCountriesList);
}

function showCountriesList(resp) {
    var countryName = document.getElementById('country-name').value;
    var result = resp.filter(function (country) {
        var filteredName = country.name.toLowerCase();
        var filteredCountryName = countryName.toLowerCase();
        return filteredName.includes(filteredCountryName);
    });
    countriesList.innerHTML = '';
    result.forEach(function (country) {
        generateTemplate(country);
    });
}

function generateTemplate(country) {
    var template = document.getElementById('country-template').innerHTML;

    var data = {
        flag: country.flag,
        name: country.name,
        capital: country.capital,
        languages: country.languages[0].name,
        currenciesName: country.currencies[0].name,
        area: country.area,
        population: country.population,
        region: country.region,
        subregion: country.subregion
    };

    Mustache.parse(template);

    countriesList.insertAdjacentHTML(
        'beforeend',
        Mustache.render(template, data)
    );
}
