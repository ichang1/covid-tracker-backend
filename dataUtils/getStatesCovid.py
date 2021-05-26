import requests
from jsonToFile import jsonToText

if __name__ == '__main__':
    data = {}
    states_res = requests.get("https://disease.sh/v3/covid-19/states")
    states_dont_add = [
        "US Military",
        "Veteran Affairs",
        "Federal Prisons",
        "Grand Princess Ship",
        "Wuhan Repatriated",
        "Diamond Princess Ship",
    ]
    for s in states_res.json():
        state_name = s['state']
        if state_name not in states_dont_add:
            url = f"https://disease.sh/v3/covid-19/states/{state_name}"
            api = 'Worldometers'
            place_data = {
                'url': url,
                'api': api
            }
            data[state_name] = place_data

    jsonToText('./text/statesCovid.txt', data)
