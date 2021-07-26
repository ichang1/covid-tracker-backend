import requests
from jsonToFile import jsonToText
from utils.capitalize_words import capitalize_words

if __name__ == '__main__':
    data = {}
    province_res = requests.get("https://disease.sh/v3/covid-19/historical?lastdays=1")
    for p in province_res.json():
        country = p['country']
        province = p['province']
        if country != 'US' and province != None and province != 'Unknown' and 'rincess' not in province:
            url = f"https://disease.sh/v3/covid-19/historical/{'%20'.join(country.split(' '))}/{'%20'.join(province.split(' '))}?lastdays=all"
            place_data = {
                'JHUCSSE_url': url
            }
            data[capitalize_words(province)] = place_data
    # print(len(data))
    jsonToText('./text/provincesCovid.txt', data)
