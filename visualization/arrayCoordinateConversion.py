testArray = [1,1,0,1,0,0,2,2,2]
mapsize = len(testArray)

coordinateDict = {}
for i, item in enumerate(testArray):
    if item not in coordinateDict:
        coordinateDict[item] = {'coordinates': str() + str() + str() + str()}

print(coordinateDict)
