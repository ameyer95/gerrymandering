import region


def getAllTilings(region, tileSet):
    possiblePieces = piecesToPlace(region,tileSet)
    solutions= []
    for x in possiblePieces:
        region.addPiece(x[1],x[2],x[0])
        pieces = [x[1]]
        solutions.extend(tilingRecursive(region, tileSet, pieces, []))
        region.reset()
    return solutions

def tilingRecursive(region, tileSet, pieces, solutions):
    possiblePieces = piecesToPlace(region, tileSet)
    if possiblePieces == []:
        if region.partitionedRegion():
            solutions.append(pieces)
        #if pieces == []:
         #   raise SystemError()  # basically there should never be a point when no tiles fit on the empty board
       # pieces.pop() #maybe don't need to pop here because we do it when we recurse back to the else case?
        # seems possible we don't need these next few lines
        # regionCoords = remove[0]
        # tile = remove[1]
        # tileCenterCoords = remove[2]
        # region.removeTile(tile,regionCoords,tileCenterCoords)
        # tilingRecursive(region, tileSet, pieces, solutions)
        return solutions
    else:
        # I don't think I need these next lines
        # nextPiece = possiblePieces[-1][1]
        # nextTileCoords = possiblePieces[-1][0]
        # nextRegionCoords = possiblePieces[-1][2]
        # pieces.append(possiblePieces.pop())
        # region.addPiece(nextPiece, nextTileCoords, nextRegionCoords)
        for x in range(0,len(possiblePieces)):
            pieces.append(possiblePieces[x])
            region.addPiece(possiblePieces[x][1], possiblePieces[x][2], possiblePieces[x][0])
            tilingRecursive(region, tileSet, pieces, solutions)
            pieces.remove(possiblePieces[x])
            region.removePiece(possiblePieces[x][1], possiblePieces[x][2], possiblePieces[x][0])
        return solutions


def tileFits(region,x,y,tile): # determines whether the tile can be placed into the region at position x,y
    # returns a list of all ways a tile can be placed onto a position overlaying x,y (so tries all open slots
    # of the tile as being directly on top of x,y. If that's viable, then returns the tile coordinates that go on top of
    # x,y. If no positioning works, then returns an empty list.
    filledCellsInTile = tile.getFilledCells()
    workingStarts = []
    for filledCell in filledCellsInTile:
        working = True
        # we need to iterate through each possible overlay of this tile on the spot......
        # ugh this problem is so computationally intense shoulda stuck with java
        xInTile = filledCell[0]
        yInTile = filledCell[1]
        for nextCell in filledCellsInTile:
            differenceX = nextCell[0] - xInTile
            differenceY = nextCell[1] - yInTile
            if x+differenceX >= region.sideLength or y+differenceY >= region.sideLength or x+differenceX < 0 or y+differenceY < 0 or region.grid[x+differenceX][y+differenceY] != 0:
                working = False
        if working:
            workingStarts.append([filledCell,tile,[x,y]])
    return workingStarts


def piecesToPlace(region, tileSet): #returns tiles that fit in first open spot in grid
    pieces = []
    for x in range(region.sideLength):
        for y in range(region.sideLength):
            if region.grid[x][y] == 0:
                for tile in tileSet:
                    placements = tileFits(region,x,y,tile)
                    if placements!=[]:
                        for placement in placements:
                            pieces.append(placement)
                return pieces
    return pieces #this return statement only used when grid is full