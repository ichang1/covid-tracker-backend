import requests
from jsonToFile import jsonToText
from utils.capitalize_words import capitalize_words

if __name__ == '__main__':
    data = {}

    states_dont_add = [
        "US Military",
        "Veteran Affairs",
        "Federal Prisons",
        "Grand Princess Ship",
        "Wuhan Repatriated",
        "Diamond Princess Ship",
        "Navajo Nation"
    ]

    states_res = requests.get("https://disease.sh/v3/covid-19/states")

    for s in states_res.json():
        state_name = s['state']
        if state_name in states_dont_add:
            continue
        elif state_name == "United States Virgin Islands":
            worldometers_url = f"https://disease.sh/v3/covid-19/states/{'%20'.join(state_name.split(' '))}"
            JHUCSSE_url = f"https://disease.sh/v3/covid-19/historical/usacounties/virgin islands?lastdays=all"
            place_data = {
                "worldometers_url": worldometers_url,
                "JHUCSSE_url": JHUCSSE_url,
            }
            data[state_name] = place_data
        else:
            worldometers_url = f"https://disease.sh/v3/covid-19/states/{'%20'.join(state_name.split(' '))}"
            JHUCSSE_url = f"https://disease.sh/v3/covid-19/historical/usacounties/{state_name.lower()}?lastdays=all"
            place_data = {
                "worldometers_url": worldometers_url,
                "JHUCSSE_url": JHUCSSE_url,
            }
            data[state_name] = place_data

    # for state, d in data.items():
    #     print(state)
    #     a = requests.get(d["worldometers_url"])
    #     assert(a.status_code == 200)
    #     b = requests.get(d["JHUCSSE_url"])
    #     assert(b.status_code == 200)

    jsonToText('./text/statesCovid.txt', data)
