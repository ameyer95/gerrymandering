import pickle
import pandas as pd

allTilings = pickle.load(open("tilings.p", "rb"))
polsbyScores = pickle.load(open("polsbyScores.P", "rb"))
reockScores = pickle.load(open("reockScores.P", "rb"))

print(reockScores)

def createVertices(matrix, districtID, mapsize):
    startIndex = matrix.index(districtID)
    startSpotX = ((startIndex % (mapsize ** .5))*150)
    startSpotY = (int(startIndex / (mapsize ** .5))*150)

    tileIndices = []
    for i in range(len(matrix)):
        if matrix[i] == districtID:
            tileIndices.append([i % (mapsize ** .5), int(i / (mapsize ** .5))])

    coordinateString = str(startSpotX) + "," + str(startSpotY) + " "
    coordinateList = []
    for i in range(len(tileIndices)):
        coordinateList.append([int(tileIndices[i][0] * 150), int(tileIndices[i][1] * 150)])
        coordinateList.append([int(tileIndices[i][0] * 150 + 140), int(tileIndices[i][1] * 150)])
        coordinateList.append([int(tileIndices[i][0] * 150 + 140), int(tileIndices[i][1] * 150 + 140)])
        coordinateList.append([int(tileIndices[i][0] * 150), int(tileIndices[i][1] * 150 + 140)])

    return coordinateList

def traverseVertices(vertices):
    neworder, lastmove, counter = [vertices[0]], "horizontal", 0
    for i in range(len(vertices)):
        vertex = neworder[i]
        distanceFromOrigin = abs(vertex[0] - neworder[0][0]) + abs(vertex[1] - neworder[0][1])
        if counter >= 3 and distanceFromOrigin <= 140:
            neworder.append(neworder[0])
            break

        possiblemoves = []
        for checkvertex in vertices:
            distance = abs(checkvertex[0] - vertex[0]) + abs(checkvertex[1] - vertex[1])
            if 0 < distance <= 140 and checkvertex not in neworder:
                possiblemoves.append(checkvertex)

        shortmovePossible = False
        for move in possiblemoves:
            distance = abs(move[0] - vertex[0]) + abs(move[1] - vertex[1])
            if distance == 10:
                shortmovePossible = True
                neworder.append(move)
                if abs(move[1] - vertex[1]) == 0:
                    lastmove = "horizontal"
                else:
                    lastmove = "vertical"
                break

        if not shortmovePossible:
            samedirectionPossible = False
            for move in possiblemoves:
                if abs(move[1] - vertex[1]) == 0 and lastmove == "horizontal":
                    neworder.append(move)
                    samedirectionPossible = True
                    break
                elif abs(move[0] - vertex[0]) == 0 and lastmove == "vertical":
                    neworder.append(move)
                    samedirectionPossible = True
                    break

            if not samedirectionPossible:
                if possiblemoves:
                    neworder.append(possiblemoves[0])

        counter += 1

    return neworder

def compileDistrict(testmatrix, mapsize, distinctTiles):
    inorder = []
    for i in range(len(distinctTiles)):
        inorder.append(traverseVertices(createVertices(testmatrix, i, mapsize)))

    scaledInorder = []
    for i, tile in enumerate(inorder):
        scaledInorder.append([])
        for coordinate in tile:
            scaledInorder[i].append([int(coordinate[0]*.8), int(coordinate[1]*.8)])

    return scaledInorder

def main():
    masterDistrictList = []
    for i in range(len(allTilings)):
        testmatrix_ = allTilings[i]
        mapsize_ = len(testmatrix_)
        distinctTiles_ = list(set(testmatrix_))

        masterDistrictList.append([testmatrix_, compileDistrict(testmatrix_, mapsize_, distinctTiles_)])

    #Create dataframe and csv file
    dfList = [[],[]]
    for block in masterDistrictList:
        dfList[0].append(block[0])
        dfList[1].append(block[1])

    mydf = pd.DataFrame(dfList).transpose()
    mydf.to_csv("tilingdata.csv", index = False)

if __name__ == "__main__":
    _ = 5
    # main()
