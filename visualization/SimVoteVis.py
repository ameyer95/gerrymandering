import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

urbanBeltwayData = pd.read_csv("UrbanBeltway_Vote_Distributions.csv")
print(urbanBeltwayData)

Dem, Rep = urbanBeltwayData['Democrat'].tolist(), urbanBeltwayData['Republican'].tolist()
DemCounter, RepCounter, SplitCounter = 0,0,0
for d, r in zip(Dem, Rep):
    if d == r:
        SplitCounter += 1
    elif d > r:
        DemCounter += 1
    elif d < r:
        RepCounter += 1

labels = ['Republican', 'Democrat', 'Split']
colors = ['Red', 'Blue', 'Gray']
piedata = [RepCounter, DemCounter, SplitCounter]
print(piedata)
plt.pie(piedata, labels = labels, startangle = 90, colors = colors)
plt.axis('equal')
plt.show()
