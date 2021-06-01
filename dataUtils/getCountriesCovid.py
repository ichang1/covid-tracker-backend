import requests
from jsonToFile import jsonToText
from utils.capitalize_words import capitalize_words


if __name__ == '__main__':
    data = {}

    country_res = requests.get(
        "https://disease.sh/v3/covid-19/historical?lastdays=1")

    for s in country_res.json():
        country_name = s['country']
        if country_name == "UK":
            JHUCSSE_url = f"https://disease.sh/v3/covid-19/historical/UK?lastdays=all"
            place_data = {
                "JHUCSSE_url": JHUCSSE_url,
            }
            data["United Kingdom"] = place_data
        elif country_name == "USA":
            JHUCSSE_url = f"https://disease.sh/v3/covid-19/historical/USA?lastdays=all"
            place_data = {
                "JHUCSSE_url": JHUCSSE_url,
            }
            data["United States"] = place_data
        elif country_name == "S. Korea":
            JHUCSSE_url = f"https://disease.sh/v3/covid-19/historical/South%20Korea?lastdays=all"
            place_data = {
                "JHUCSSE_url": JHUCSSE_url,
            }
            data["South Korea"] = place_data
        elif country_name == "Burma":
            JHUCSSE_url = f"https://disease.sh/v3/covid-19/historical/Burma?lastdays=all"
            place_data = {
                "JHUCSSE_url": JHUCSSE_url,
            }
            data["Myanmar"] = place_data
        else:
            JHUCSSE_url = f"https://disease.sh/v3/covid-19/historical/{'%20'.join(country_name.split(' '))}?lastdays=all"
            place_data = {
                "JHUCSSE_url": JHUCSSE_url,
            }
            data[capitalize_words(country_name)] = place_data

    vaccine_res = requests.get(
        "https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=1&fullData=true")
    for c in vaccine_res.json():
        country_name = c["country"]
        vaccine_url = f"https://disease.sh/v3/covid-19/vaccine/coverage/countries/{'%20'.join(country_name.split(' '))}?lastdays=30&fullData=true"
        if capitalize_words(country_name) in data.keys():
            data[capitalize_words(country_name)]['vaccine_url'] = vaccine_url
        elif country_name == "USA":
            data['United States']['vaccine_url'] = vaccine_url
        elif country_name == "UK":
            data['United Kingdom']['vaccine_url'] = vaccine_url
        elif country_name == "S. Korea":
            data['South Korea']['vaccine_url'] = vaccine_url

    # john_c = set([a['country'] for a in country_res.json()])
    # raps_c = set([b['country'] for b in vaccine_res.json()])
    # print(john_c)
    # print((john_c ^ raps_c) & john_c)
    # print("")
    # print((john_c ^ raps_c) & raps_c)

    key_to_be_del = set()
    for country, d in data.items():
        if 'vaccine_url' not in d.keys():
            key_to_be_del.add(country)

    for key in key_to_be_del:
        del data[key]

    # for country, d in data.items():
    #     print(country)
    #     b = requests.get(d["JHUCSSE_url"])
    #     assert (b.status_code == 200)
    #     print("\tjohn done")
    #     c = requests.get(d["vaccine_url"])
    #     assert (c.status_code == 200)
    #     print("\tvaccine done")

    jsonToText('./text/countriesCovid.txt', data)
