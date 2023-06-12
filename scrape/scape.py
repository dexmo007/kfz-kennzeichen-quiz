import json
import requests
from bs4 import BeautifulSoup
import sys

output_file = sys.argv[1]

res = requests.get('https://de.wikipedia.org/wiki/Liste_der_Kfz-Kennzeichen_in_Deutschland')

soup = BeautifulSoup(res.content, 'html.parser')

license_plates = []

for i in range(26):
    letter = chr(ord('A') + i)
    h3 = soup.select_one(f'h3 > span[id={letter}]').parent
    table = h3.find_next_sibling('table')

    spanning = 0

    for tr in table.find('tbody').find_all('tr'):
        if spanning > 0:
            resolution = tr.find('td').text.strip()
            license_plates[-1]['resolution'].append(resolution)
            spanning -= 1
            continue
        data = tr.find_all('td')
        if not data:
            continue
        if data[0].has_attr('rowspan'):
            spanning = int(data[0]['rowspan']) - 1
        abbr = data[0].text.strip()
        resolution = data[1].text.strip()
        derived_from = data[2].text.strip()
        state = data[3].text.strip()
        license_plates.append({
            'letter': letter,
            'abbr': abbr,
            'resolution': [resolution],
            'derived_from': derived_from,
            'state': state
        })

with open(output_file, 'w') as f:
    json.dump(license_plates, f)
