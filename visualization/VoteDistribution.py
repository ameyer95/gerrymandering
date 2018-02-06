import pandas as pd
import json
import pprint
import matplotlib.pyplot as plt

# voteDistribution = [.4,.35,.38,.39,.28,.35,.5,.75,.8,.20,.48,.58,.90,.68,.3,.33,.78,.85,.42,.36,.38,.45,.4,.37,.35]
voteDistribution = [.9,.8,.7,.6,.5,.8,.7,.6,.5,.4,.7,.6,.5,.4,.3,.6,.5,.4,.3,.2,.5,.4,.3,.2,.1]
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

print(votesByTile)
# outdf = pd.DataFrame(votesByTile)
# print(outdf)
# outdf.to_csv("Vote_Distributions.csv", index = False)

seatList = []
for item in votesByTile:
    seats = [0, 0, 0]
    for key in item:
        if item[key] > .5:
            seats[0] += 1
        elif item[key] < .5:
            seats[1] += 1
        elif item[key] == .5:
            seats[2] += 1

    seatList.append(seats)

seatList.sort()
pprint.pprint(seatList)
