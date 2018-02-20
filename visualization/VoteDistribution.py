import pandas as pd
import json
import pprint
import matplotlib.pyplot as plt
import seaborn as sns

# voteDistribution = [.4,.35,.38,.39,.28,.35,.5,.75,.8,.20,.48,.58,.90,.68,.3,.33,.78,.85,.42,.36,.38,.45,.4,.37,.35]
# voteDistribution = [.9,.8,.7,.6,.5,.8,.7,.6,.5,.4,.7,.6,.5,.4,.3,.6,.5,.4,.3,.2,.5,.4,.3,.2,.1]
voteDistribution = [.6,.45,.45,.4,.4,.6,.45,.6,.525,.45,.3,.45,.4,.45,.3,.55,.8,.4,.45,.9,.525,.45,.45,.55,.6]
# voteDistribution = [.5,.5,.2,.4,.8,.1,.4,.7,.3,.5,.8,.5,.3,.2,.5,.2,.5,.6,.4,.7,.9,.6,.3,.5,.6]
# voteDistribution = [.7,.6,.5,.4,.3,.7,.6,.5,.4,.3,.7,.6,.5,.4,.3,.7,.6,.5,.4,.3,.7,.6,.5,.4,.3]
# voteDistribution = [.4]*25
# voteDistribution.reverse()

districtData = pd.read_csv("tilingdata.csv")["0"]
districtData = list(map(lambda x: json.loads(x), districtData))

votesByTile = []
for districting in districtData:
    voteDict = {}
    for i, item in enumerate(voteDistribution):
        if str(districting[i]) not in voteDict:
            voteDict[str(districting[i])] = item
        else:
            voteDict[str(districting[i])] += item

    for key in voteDict:
        if abs((voteDict[key]/5)-.5) < .00001:
            voteDict[key] = .5
        else:
            voteDict[key] = voteDict[key]/5

    votesByTile.append(voteDict)

EGList = []
for districting in votesByTile:
    repWastedPct, demWastedPct = 0, 0
    for district in districting:
        districtVote = districting[district]
        if districtVote >= .5:
            demWastedPct += districtVote - .5
            repWastedPct += 1 - districtVote
        elif districtVote < .5:
            demWastedPct += districtVote
            repWastedPct += (1 - districtVote) - .5

    EG = (demWastedPct - repWastedPct)/5
    EGList.append(EG)

EGList.sort()
print(sum(EGList) / len(EGList))
plt.scatter(list(range(len(EGList))), EGList, marker = 'o')
plt.xlabel("Districtings (sorted)")
plt.ylabel("Efficiency Gap")
plt.show()
