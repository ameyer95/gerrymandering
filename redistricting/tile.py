import tiler
import region

class Tile:
    def __init__(self, n):
        self.sideLength = n
        #self.pieces = 2
        self.grid = [[0 for x in range(n)] for y in range(n)]
        self.index = 0

    def setOpenSquares(self, coords):
        for coord in coords:
            self.grid[coord[0]][coord[1]] = 1

    def getFilledCells(self):
        filledCells = []
        for x in range(self.sideLength):
            for y in range(self.sideLength):
                if self.grid[x][y] == 1:
                    filledCells.append([x,y])
        return filledCells

def makeAllTiles(n):
    addingTiles = []
    tile = Tile(n)
    tile.setOpenSquares([[0,0]])
    addingTiles.append(tile)
    for x in range(2,n+1):
        newTiles = []
        for tile in addingTiles:
            theseTiles = extendTile(tile,n)
            for entry in theseTiles:
                leftOkay = False
                rightOkay = False
                for y in range(n):
                    if entry.grid[y][0] != 0:
                        leftOkay = True
                    if entry.grid[0][y] != 0:
                        rightOkay = True
                if not leftOkay:
                    entry = shiftY(entry,n)
                if not rightOkay:
                    entry = shiftX(entry,n)
                if not match(entry, newTiles):
                    newTiles.append(entry)
        addingTiles = newTiles
    for x in range(0,len(addingTiles)):
        addingTiles[x].index = x+1
    return addingTiles

def shiftX(tile,n):
    for x in range(0,n-1):
        for y in range(n):
            tile.grid[x][y] = tile.grid[x+1][y]
    for y in range(n):
        tile.grid[n-1][y] = 0
    return tile

def shiftY(tile,n):
    for x in range(n):
        for y in range(0,n-1):
            tile.grid[x][y] = tile.grid[x][y+1]
    for x in range(n):
        tile.grid[x][n-1] = 0
    return tile

def extendTile(tile,n):
    tiles = []
    #as is
    for x in range(n):
        for y in range(n):
            if tile.grid[x][y] == 0:
                if (x!=0 and tile.grid[x-1][y] == 1) or (x!=n-1 and tile.grid[x+1][y]==1) or (y!=0 and tile.grid[x][y-1]==1) or (y!=n-1 and tile.grid[x][y+1]==1):
                    newTile = clone(tile,0,0,n)
                    newTile.grid[x][y] = 1
                    tiles.append(newTile)
    # shift left
    for y in range(n):
        canShiftY = True
        if tile.grid[n-1][y] != 0:
            canShiftY = False
    if canShiftY:
        newTile = clone(tile,1,0,n)
        for x in range(n):
            for y in range(n):
                if newTile.grid[x][y] == 0:
                    if (x!=0 and newTile.grid[x-1][y] == 1) or (x!=n-1 and newTile.grid[x+1][y]==1) or (y!=0 and newTile.grid[x][y-1]==1) or (y!=n-1 and newTile.grid[x][y+1]==1):
                        newNewTile = clone(newTile, 0, 0,n)
                        newNewTile.grid[x][y] = 1
                        tiles.append(newNewTile)
    #shift down
    for x in range(n):
        canShiftX = True
        if tile.grid[x][n-1] != 0:
            canShiftX = False
    if canShiftX:
        newTile = clone(tile,0,1,n)
        for x in range(n):
            for y in range(n):
                if newTile.grid[x][y] == 0:
                    if (x!=0 and newTile.grid[x-1][y] == 1) or (x!=n-1 and newTile.grid[x+1][y]==1) or (y!=0 and newTile.grid[x][y-1]==1) or (y!=n-1 and newTile.grid[x][y+1]==1):
                        newNewTile = clone(newTile, 0, 0,n)
                        newNewTile.grid[x][y] = 1
                        tiles.append(newNewTile)
    return tiles


def clone(tile,x,y,n):
    newTile = Tile(n)
    for cell in tile.getFilledCells():
        if (cell[0] != n-x) and (cell[1]!=n-y):
            newTile.grid[cell[0]+x][cell[1]+y] = 1
    return newTile

def match(newTile, currentTiles):
    if len(currentTiles) == 0:
        return False
    goal = len(newTile.getFilledCells())
    for tile in currentTiles:
        count = 0
        for cell in tile.getFilledCells():
            if newTile.grid[cell[0]][cell[1]] != 0:
                count=count+1
        if count == goal:
            return True
    return False
