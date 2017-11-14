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
        # coordinateString = str(startSpotX) + "," + str(startSpotY) + " "
        # for item in tileIndices:
        #     polyCoord = str(item[0] * 150) + "," + str(item[1] * 150) + " "
        #     coordinateString += polyCoord

        # print(coordinateString)


def main():
    newTraversal()

if __name__ == "__main__":
    main()




"0,0 150,0 275,0 275,125 150,125 0,150 125,150 125,275 0,275 "

# for districtNum in distinctTiles:
#
#     tileNotComplete = True
#     traverseStack = [testArray.index(districtNum)]
#     i = 0
#     while tileNotComplete:
#         print(str(i) + "------------")
#         currentIndex = traverseStack[-1]
#
#         try:
#             if testArray[currentIndex + 1] == districtNum:
#                 traverseStack.append(currentIndex + 1)
#                 print('A')
#                 print(currentIndex)
#                 print(traverseStack)
#         except IndexError:
#             continue
#
#         try:
#             if testArray[currentIndex + int(mapsize**.5)] == districtNum:
#                 traverseStack.append(currentIndex + int(mapsize**.5))
#                 print('B')
#                 print(currentIndex)
#                 print(traverseStack)
#         except IndexError:
#             continue
#
#         else:
#             traverseStack.pop()
#             if len(traverseStack) == 1:
#                 tileNotComplete = False
#             print('C')
#             print(currentIndex)
#             print(traverseStack)
#
#         i += 1
