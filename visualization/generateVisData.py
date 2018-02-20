import pickle
from traversal import createVertices, traverseVertices
import pandas as pd

testmatrix = [0,0,0,0,0,1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4]
mapsize = len(testmatrix)
distinctTiles = list(set(testmatrix))

districtTilings = pickle.load(open('FiveByFive.P', 'rb'))
polsbyScores = pickle.load(open('AllPolsby.P', 'rb'))

def transformDistrictTilings():
    mapping = {"5":0, "4":1, "3":2, "2":3, "1":4}
    transformedDistricts = []
    for districting in districtTilings:
        newIndices = []
        for row in districting:
            for item in row:
                newIndices.append(mapping[str(item)])

        transformedDistricts.append(newIndices)

    return transformedDistricts

def main():
    districtsList = transformDistrictTilings()
    districtIDs = [0,1,2,3,4]
    allPolsbyScores = []
    for i, districting in enumerate(districtsList):
        districtPolsbyScores = []
        for ID in districtIDs:
            flattenedList = [item for sublist in polsbyScores[i] for item in sublist]
            districtPolsbyScores.append(flattenedList[districtsList[i].index(ID)])

        allPolsbyScores.append(districtPolsbyScores)

    print(allPolsbyScores)
    # pickle.dump(districtsList, open("tilings.p", "wb"))



if __name__ == "__main__":
    main()
