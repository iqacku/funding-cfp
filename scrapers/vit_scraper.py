import requests
from bs4 import BeautifulSoup
import json

URL = "https://chennai.vit.ac.in/research/sponsoredresearch/call-for-proposals/"

response = requests.get(URL)

soup = BeautifulSoup(response.text, "html.parser")

tables = soup.find_all("table")

all_calls = []

for table in tables:

    rows = table.find_all("tr")

    for row in rows[1:]:

        cols = row.find_all("td")

        if len(cols) >= 4:

            try:
                title = cols[0].get_text(strip=True)

                agency = cols[1].get_text(strip=True)

                deadline = cols[3].get_text(strip=True)

                link = ""

                a_tag = row.find("a")

                if a_tag and a_tag.get("href"):
                    link = a_tag["href"]

                all_calls.append({
                    "agency": agency,
                    "scheme": title,
                    "title": title,
                    "deadline": deadline,
                    "link": link
                })

            except Exception as e:
                print(e)

with open("../calls.json", "w", encoding="utf-8") as f:
    json.dump(all_calls, f, indent=4)

print("calls.json updated successfully")
