testArray = [1,1,0,1,0,0,2,2,2]
distinctTiles = [1,0,2]
mapsize = len(testArray)

def newTraversal():
    for districtNum in distinctTiles:
        startIndex = testArray.index(districtNum)
        startSpotX = (int(startIndex % (mapsize ** .5))*150)
        startSpotY = (int(startIndex / (mapsize ** .5))*150)

        tileIndices = []
        for i in range(len(testArray)):
            if testArray[i] == districtNum:
                tileIndices.append([int(i % (mapsize ** .5)), int(i / mapsize ** .5)])


        print(tileIndices)
        coordinateList = []
        for item in tileIndices:
            coordinateList.append([item[0] * 150, item[1] * 150])
            coordinateList.append([item[0] * 150 + 125, item[1] * 150])
            coordinateList.append([item[0] * 150 + 125, item[1] * 150 + 125])
            coordinateList.append([item[0] * 150, item[1] * 150 + 125])

        print(coordinateList)

def orderCorners():
    points = [[0,0], [150,0], [275,0], [275,125], [150,125], [0,150], [125,150], [125,275], [0,275]]
    newOrder = [points[0]]
    for i in range(len(points)):
        anchorPoint = points[i]
        minDistance = 1000
        for j in range(len(points)):
            distance = (points[j][0] - anchorPoint[0]) + (points[j][1] - anchorPoint[1])
            print(anchorPoint, points[j], distance)



def main():
    # newTraversal()
    orderCorners()

if __name__ == "__main__":
    main()
