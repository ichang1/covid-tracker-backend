import requests


def getLatLong(place):
    api_key = "ff2748c6dacc003d8c4f83e4aaba7c93"
    res = requests.get("http://api.positionstack.com/v1/forward", params={
        'access_key': api_key,
        'query': place,
        'limit': 1,
        'fields': ["results.longitude", "results.latitude"],
    })
    # position stack api is weird, sometimes empty data is returned
    # need to make the api call over and over until we get the data
    while 'data' not in res.json().keys() or len(res.json()['data'][0]) == 0:
        res = requests.get("http://api.positionstack.com/v1/forward", params={
            'access_key': api_key,
            'query': place,
            'limit': 1,
            'fields': ["results.longitude", "results.latitude"],
        })

    latitude = res.json()['data'][0]['latitude']
    longitude = res.json()['data'][0]['longitude']
    data = {'latitude': latitude, 'longitude': longitude}
    return data
