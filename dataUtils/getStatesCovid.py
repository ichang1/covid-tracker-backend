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
            data["Virgin Islands"] = place_data
        else:
            worldometers_url = f"https://disease.sh/v3/covid-19/states/{'%20'.join(state_name.split(' '))}"
            JHUCSSE_url = f"https://disease.sh/v3/covid-19/historical/usacounties/{state_name.lower()}?lastdays=all"
            place_data = {
                "worldometers_url": worldometers_url,
                "JHUCSSE_url": JHUCSSE_url,
            }
            data[state_name] = place_data

    vaccine_res = requests.get(
        "https://disease.sh/v3/covid-19/vaccine/coverage/states?lastdays=1&fullData=true")
    for state in vaccine_res.json():
        state_name = capitalize_words(state["state"])
        if state_name in data.keys():
            data[state_name][
                "vaccine"] = f"https://disease.sh/v3/covid-19/vaccine/coverage/states/{state_name}?lastdays=all&fullData=true"
        elif state_name == "New York State":
            data["New York"][
                "vaccine"] = f"https://disease.sh/v3/covid-19/vaccine/coverage/states/{state_name}?lastdays=all&fullData=true"
    for state, d in data.items():
        print(state)
        # a = requests.get(d["worldometers_url"])
        # assert (a.status_code == 200)
        # print("\tworldo done")
        # b = requests.get(d["JHUCSSE_url"])
        # assert (b.status_code == 200)
        # print("\tjohn done")
        c = requests.get(d["vaccine"])
        assert (c.status_code == 200)
        print("\tvaccine done")

    jsonToText('./text/statesCovid.txt', data)
