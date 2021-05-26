import requests
from jsonToFile import jsonToText

if __name__ == '__main__':
    data = {}
    continents_res = requests.get("https://disease.sh/v3/covid-19/continents")
    for c in continents_res.json():
        continent_name = c['continent']
        url = f'https://disease.sh/v3/covid-19/continents/{continent_name}'
        api = 'Worldometers'
        place_data = {
            'url': url,
            'api': api
        }
        data[continent_name] = place_data

    jsonToText('./text/continentsCovid.txt', data)
