import requests
from jsonToFile import jsonToText

if __name__ == '__main__':
    data = {}
    country_res = requests.get("https://disease.sh/v3/covid-19/countries")
    for c in country_res.json():
        country_name = c['country']
        url = f"https://disease.sh/v3/covid-19/countries/{country_name}"
        api = 'Worldometers'
        if country_name == 'UK':
            country_name = 'United Kingdom'
            place_data = {
                'url': url,
                'api': api
            }
            data[country_name] = place_data
        elif 'Princess' in country_name:
            continue
        else:
            place_data = {
                'url': url,
                'api': api
            }
            data[country_name] = place_data

    jsonToText('./text/countriesCovid.txt', data)
