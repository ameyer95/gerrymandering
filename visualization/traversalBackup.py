firsttest = [[0,0],[125,0],[150,0],[125,125],[0,125],[150,125],[275,125],[275,0],[0,150],[0,275],[125,150],[125,275]]
secondtest = [[0, 300],[125, 300],[125, 425],[0, 425],[150, 300],[275, 300],[275, 425],[150, 425],[300, 300],[425, 300],[425, 425],[300, 425]]

testmatrix = [0,0,0,0,2,0,4,4,4,2,1,1,3,4,2,1,1,3,4,2,1,3,3,3,2]
mapsize = len(testmatrix)
distinctTiles = list(set(testmatrix))

def createVertices(matrix, districtID):
    startIndex = matrix.index(districtID)
    startSpotX = ((startIndex % (mapsize ** .5))*150)
    startSpotY = (int(startIndex / (mapsize ** .5))*150)

    tileIndices = []
    for i in range(len(matrix)):
        if testmatrix[i] == districtID:
            tileIndices.append([i % (mapsize ** .5), int(i / (mapsize ** .5))])

    coordinateString = str(startSpotX) + "," + str(startSpotY) + " "
    coordinateList = []
    for i in range(len(tileIndices)):
        coordinateList.append([int(tileIndices[i][0] * 150), int(tileIndices[i][1] * 150)])
        coordinateList.append([int(tileIndices[i][0] * 150 + 125), int(tileIndices[i][1] * 150)])
        coordinateList.append([int(tileIndices[i][0] * 150 + 125), int(tileIndices[i][1] * 150 + 125)])
        coordinateList.append([int(tileIndices[i][0] * 150), int(tileIndices[i][1] * 150 + 125)])

    return coordinateList

def traverseVertices(vertices):
    neworder, lastmove, counter = [vertices[0]], "horizontal", 0
    for i in range(len(vertices)):
        vertex = neworder[i]
        distanceFromOrigin = abs(vertex[0] - neworder[0][0]) + abs(vertex[1] - neworder[0][1])
        if counter >= 3 and distanceFromOrigin <= 125:
            neworder.append(neworder[0])
            break

        possiblemoves = []
        for checkvertex in vertices:
            distance = abs(checkvertex[0] - vertex[0]) + abs(checkvertex[1] - vertex[1])
            if 0 < distance <= 125 and checkvertex not in neworder:
                possiblemoves.append(checkvertex)

        shortmovePossible = False
        for move in possiblemoves:
            distance = abs(move[0] - vertex[0]) + abs(move[1] - vertex[1])
            if distance == 25:
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


def main():
    inorder = []
    for i in range(len(distinctTiles)):
        inorder.append(traverseVertices(createVertices(testmatrix, i)))

    scaledInorder = []
    for i, tile in enumerate(inorder):
        scaledInorder.append([])
        for coordinate in tile:
            scaledInorder[i].append([int(coordinate[0]*.8), int(coordinate[1]*.8)])

    print(scaledInorder)

if __name__ == "__main__":
    main()
