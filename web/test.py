import requests

# Lat-Lon of New York
URL = "https://www.pvoil.com.vn/truyen-thong/tin-gia-xang-dau"
resp = requests.get(URL)
print(resp.status_code)
# print(resp.text)



from bs4 import BeautifulSoup
 
soup = BeautifulSoup(resp.text, "lxml")
elements = soup.select('[class^="table"]')
# for i in range(len(elements)):
#     print(elements[i].text)
print(elements[0].text)

# <td style="text-align: right;">32.870</td>