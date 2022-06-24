
import numpy as np
import requests
from bs4 import BeautifulSoup
URL = "https://www.pvoil.com.vn/truyen-thong/tin-gia-xang-dau"
resp = requests.get(URL)
print(resp.status_code)
soup = BeautifulSoup(resp.text, "lxml")
elements = soup.select('[class^="table"]')
str = elements[0].text
# print(str)
id = str.find("Xăng RON 95-III") + 15
a95_3 = float(str[id:id+7])*1000
print('1. A95-III:', a95_3)

id = str.find("Xăng E5 RON 92-II") + 17
a92_2 = float(str[id:id+7])*1000
print('2. A92-II:', a92_2)

id = str.find("Dầu DO 0,05S-II") + 15
do_2 = float(str[id:id+7])*1000
print('3. Diesel:', do_2)

price = None
tp = input('Type of fuel: ')
if tp=='1':
    price = a95_3
elif tp=='2':
    price = a92_2
elif tp=='3':
    price = do_2

total = float(input('Total trip (Km): '))
gas_cost = float(input('Amount of money for gas: '))

num_of_liter = gas_cost/price

print('Number of liters: ', num_of_liter)

kmpl = total/num_of_liter

print('Efficiency: ' , (kmpl) , 'Km/l')