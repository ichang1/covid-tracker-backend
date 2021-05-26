import requests
from bs4 import BeautifulSoup


def getArea(place):
    def hasDigit(s):
        digits = [str(i) for i in range(10)]
        for d in digits:
            if d in s:
                return True
        return False

    url = 'https://www.google.com/search?q=area+of'
    for p in place.split(" "):
        url += f"+{p}"
    res = requests.get(url)

    html_doc = res.content
    soup = BeautifulSoup(html_doc, 'html.parser')
    tags = soup.find_all('div')

    for tag in tags:
        text = tag.get_text()
        if 0 < len(text) < 20 and text[0] in '0123456789' and ('mi' in text or 'acres' in text):
            text = ' '.join(text.split())
            parts = text.split(" ")
            if len(parts) > 2:
                area = float(''.join(parts[0].split(','))) * 1000000
            else:
                area = float(''.join(parts[0].split(',')))

            assert(area > 0)
            return area
    return 0
