import pickle
from traversal import createVertices, traverseVertices
import pandas as pd

districtTilings = pickle.load(open('Fiveby5tilings.p', 'rb'))

def transformDistrictTilings():
    transformedDistricts = []
    for districting in districtTilings:
        districtIDCount = 0
        transformedDistrict = []
        for i, row in enumerate(districting):
            if len(set(row)) == 1:
                transformedDistrict.append([districtIDCount]*5)
                districtIDCount += 1
            else:
                transformedDistrict.append(row)
        transformedDistricts.append(transformedDistrict)

    flattenedDistricts = []
    for districting in transformedDistricts:
        container = []
        for row in districting:
            for item in row:
                container.append(item)
        flattenedDistricts.append(container)

    reindexedDistricts = []
    for districting in flattenedDistricts:
        newDistrict = []
        uniqueIDs = sorted(list(set(districting)))
        mapping = {}
        for i in range(len(uniqueIDs)):
            mapping[str(uniqueIDs[i])] = i

        for ID in districting:
            newDistrict.append(mapping[str(ID)])

        reindexedDistricts.append(newDistrict)

    return reindexedDistricts

def traverseDistrictings():
    testmatrix = [0,1,1,1,2,0,3,3,1,2,0,3,3,1,2,0,0,3,2,2,4,4,4,4,4]
    mapsize = len(testmatrix)
    distinctTiles = list(set(testmatrix))

    reindexedDistricts = transformDistrictTilings()
    districtingList = []
    for districting in reindexedDistricts:
        try:
            print(districting)
            inorder = []
            for i in range(len(distinctTiles)):
                inorder.append(traverseVertices(createVertices(districting, i)))
        except ValueError:
            continue

        districtingList.append([districting, inorder])

    scaledDistrictingList = []
    for districtDataBlock in districtingList:
        scaledDistrictingList.append(districtDataBlock[0])

        scaledInorder = []
        for j, tile in enumerate(districtDataBlock[1]):
            scaledInorder.append([])
            for coordinate in tile:
                scaledInorder[j].append([int(coordinate[0]*.8), int(coordinate[1]*.8)])

        scaledDistrictingList.append(scaledInorder)

    return scaledDistrictingList

def main():
    districtings = traverseDistrictings()
    blocks, paths = [], []
    for i, item in enumerate(districtings):
        if i%2 == 0:
            blocks.append(item)
        else:
            paths.append(item)

    districtingsDF = pd.DataFrame([blocks, paths]).transpose()
    districtingsDF.to_csv("districtings.csv")



if __name__ == "__main__":
    main()
