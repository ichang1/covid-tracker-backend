import requests
from jsonToFile import jsonToText
from utils.capitalize_words import capitalize_words

if __name__ == '__main__':
    data = {}
    province_res = requests.get("https://disease.sh/v3/covid-19/jhucsse")
    for p in province_res.json():
        country = p['country']
        province = p['province']
        api = 'JHUCSSE'
        url = 'https://disease.sh/v3/covid-19/jhucsse'
        if country != 'US' and province != None and province != 'Unknown' and 'Princess' not in province:
            place_data = {
                'JHUCSSE_url': url,
            }
            data[capitalize_words(province)] = place_data

    jsonToText('./text/provincesCovid.txt', data)
