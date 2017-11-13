testArray = [1,1,0,1,0,0,2,2,2]
distinctTiles = [1,0,2]
mapsize = len(testArray)

for districtNum in distinctTiles:

    tileNotComplete = True
    traverseStack = [testArray.index(districtNum)]
    i = 0
    while tileNotComplete:
        print(str(i) + "------------")
        currentIndex = traverseStack[-1]

        try:
            if testArray[currentIndex + 1] == districtNum:
                traverseStack.append(currentIndex + 1)
                print('A')
                print(currentIndex)
                print(traverseStack)
        except IndexError:
            continue

        try:
            if testArray[currentIndex + int(mapsize**.5)] == districtNum:
                traverseStack.append(currentIndex + int(mapsize**.5))
                print('B')
                print(currentIndex)
                print(traverseStack)
        except IndexError:
            continue

        else:
            traverseStack.pop()
            if len(traverseStack) == 1:
                tileNotComplete = False
            print('C')
            print(currentIndex)
            print(traverseStack)

        i += 1
