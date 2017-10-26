import tiler

class Region:
    def __init__(self,length):
        self.sideLength = length
        self.grid = [[0 for x in range (length)] for y in range(length)]

    def partitionedRegion(self):
        for x in range(self.sideLength):
            for y in range(self.sideLength):
                if self.grid[x][y] == 0:
                    return False
        return True

    def getOpenCells(self):
        openCells = []
        for x in range(self.sideLength):
            for y in range(self.sideLength):
                if self.grid[x][y] == 0:
                    openCells.append([x,y])
        return openCells

    def addPiece(self, tile, tileCoords, regionCoords):
        xCoordTile = tileCoords[0]
        yCoordTile = tileCoords[1]
        filledTileCells = tile.getFilledCells()
        for filledCell in filledTileCells:
            xDiff =  filledCell[0] - xCoordTile
            yDiff =  filledCell[1] - yCoordTile
            #not at all sure about the signs on this next line....
            self.grid[regionCoords[0] + xDiff][regionCoords[1] + yDiff] = 1

    def removePiece(self, tile, tileCoords, regionCoords):
        xCoordTile = tileCoords[0]
        yCoordTile = tileCoords[1]
        filledTileCells = tile.getFilledCells()
        for filledCell in filledTileCells:
            xDiff =  filledCell[0] - xCoordTile
            yDiff =  filledCell[1] - yCoordTile
            #again, not sure about hte signs on this line
            self.grid[regionCoords[0] + xDiff][regionCoords[1] + yDiff] = 0

    def reset(self):
        for x in range(self.sideLength):
            for y in range(self.sideLength):
                self.grid[x][y] = 0

class Tile:
    def __init__(self):
        self.sideLength = 5
        self.pieces = 5
        self.grid = [[0 for x in range(5)] for y in range(5)]

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


def makeTiles():
    tiles = []
    tile1 = Tile()
    tile1.setOpenSquares([[0,0],[0,1],[0,2],[0,3],[0,4]]) #five vertical
    tiles.append(tile1)
    tile2 = Tile()
    tile2.setOpenSquares([[0,0],[0,1],[0,2],[0,3],[1,0]]) #four in leftmost col
    tiles.append(tile2)
    tile3 = Tile()
    tile3.setOpenSquares([[0,0],[0,1],[0,2],[0,3],[1,1]])
    tiles.append(tile3)
    tile4 = Tile()
    tile4.setOpenSquares([[0,0],[0,1],[0,2],[0,3],[1,2]])
    tiles.append(tile4)
    tile5 = Tile()
    tile5.setOpenSquares([[0,0],[0,1],[0,2],[0,3],[1,3]])
    tiles.append(tile5)
    tile6 = Tile()
    tile6.setOpenSquares([[0,0],[0,1],[0,2],[1,0],[2,0]]) #three in leftmost col
    tiles.append(tile6)
    tile7 = Tile()
    tile7.setOpenSquares([[0,0],[0,1],[0,2],[1,0],[1,1]])
    tiles.append(tile7)
    tile8 = Tile()
    tile8.setOpenSquares([[0,0],[0,1],[0,2],[1,1],[1,2]])
    tiles.append(tile8)
    tile9 = Tile()
    tile9.setOpenSquares([[0,0],[0,1],[0,2],[1,0],[1,2]])
    tiles.append(tile9)
    tile10 = Tile()
    tile10.setOpenSquares([[0,1],[0,2],[0,3],[1,0],[1,1]])
    tiles.append(tile10)
    
    tile11 = Tile()
    tile11.setOpenSquares([[0,0],[0,1],[0,2],[1,2],[2,2]])
    tiles.append(tile11)
    tile12 = Tile()
    tile12.setOpenSquares([[0,0],[0,1],[0,2],[1,1],[2,1]])
    tiles.append(tile12)
    tile13 = Tile()
    tile13.setOpenSquares([[0,0],[0,1],[1,0],[1,1],[2,0]]) #two in leftmost col
    tiles.append(tile13)
    tile14 = Tile()
    tile14.setOpenSquares([[0,0],[0,1],[1,0],[1,1],[2,1]])
    tiles.append(tile14)
    tile15 = Tile()
    tile15.setOpenSquares([[0,0],[0,1],[1,1],[1,0],[1,2]])
    tiles.append(tile15)
    tile16 = Tile()
    tile16.setOpenSquares([[0,1],[0,2],[1,1],[1,2],[1,0]])
    tiles.append(tile16)
    tile17= Tile()
    tile17.setOpenSquares([[0,2],[0,3],[1,2],[1,1],[1,0]])
    tiles.append(tile17)
    tile18 = Tile()
    tile18.setOpenSquares([[0,0],[0,1],[1,0],[2,0],[3,0]])
    tiles.append(tile18)
    tile19 = Tile()
    tile19.setOpenSquares([[0,0],[0,1],[1,1],[2,1],[3,1]])
    tiles.append(tile19)
    tile20 = Tile()
    tile20.setOpenSquares([[0,0],[0,1],[1,1],[2,1],[2,2]])
    tiles.append(tile20)
    tile21 = Tile()
    tile21.setOpenSquares([[0,0],[0,1],[1,1],[2,0],[2,1]])
    tiles.append(tile21)
    tile22 = Tile()
    tile22.setOpenSquares([[0,0],[0,1],[1,0],[2,0],[2,1]])
    tiles.append(tile22)
    tile23 = Tile()
    tile23.setOpenSquares([[0,1],[0,2],[1,1],[2,1],[2,0]])
    tiles.append(tile23)
    til1 = Tile()
    til1.setOpenSquares([[0,0],[1,0],[2,0],[3,0],[1,1]]) #one in leftmost col
    tiles.append(til1)
    til2 = Tile()
    til2.setOpenSquares([[0,0],[1,0],[2,0],[3,0],[2,1]])
    tiles.append(til2)
    til3 = Tile()
    til3.setOpenSquares([[0,0],[1,0],[2,0],[3,0],[4,0]])
    tiles.append(til3)
    til4 = Tile()
    til4.setOpenSquares([[0,0],[1,0],[1,1],[1,2],[1,3]])
    tiles.append(til4)
    til5 = Tile()
    til5.setOpenSquares([[0,1],[1,0],[1,1],[1,2],[1,3]])
    tiles.append(til5)
    til6 = Tile()
    til6.setOpenSquares([[0,2],[1,0],[1,1],[1,2],[1,3]])
    tiles.append(til6)
    til7 = Tile()
    til7.setOpenSquares([[0,3],[1,0],[1,1],[1,2],[1,3]])
    tiles.append(til7)
    til8 = Tile()
    til8.setOpenSquares([[0,0],[1,0],[1,1],[2,0],[2,1]])
    tiles.append(til8)
    til9 = Tile()
    til9.setOpenSquares([[0,0],[1,0],[1,1],[2,1],[2,2]])
    tiles.append(til9)
    til10 = Tile()
    til10.setOpenSquares([[0,0],[1,0],[1,1],[2,1],[3,1]])
    tiles.append(til10)
    til11 = Tile()
    til11.setOpenSquares([[1,0],[1,1],[0,1],[2,0],[3,0]])
    tiles.append(til11)
    til12 = Tile()
    til12.setOpenSquares([[0,0],[1,0],[2,0],[2,1],[3,1]])
    tiles.append(til12)
    til13 = Tile()
    til13.setOpenSquares([[0,1],[1,1],[2,1],[2,0],[3,0]])
    tiles.append(til13)
    til14 = Tile()
    til14.setOpenSquares([[0,0],[1,0],[2,0],[3,0],[3,1]])
    tiles.append(til14)
    til15 = Tile()
    til15.setOpenSquares([[0,0],[1,0],[2,0],[2,1],[2,2]])
    tiles.append(til15)
    til16 = Tile()
    til16.setOpenSquares([[0,0],[1,0],[2,0],[1,1],[1,2]])
    tiles.append(til16)
    til17 = Tile()
    til17.setOpenSquares([[0,0],[1,0],[1,1],[1,2],[2,2]])
    tiles.append(til17)
    til18 = Tile()
    til18.setOpenSquares([[0,2],[1,2],[1,1],[1,0],[2,0]])
    tiles.append(til18)
    til19 = Tile()
    til19.setOpenSquares([[0,1],[1,1],[1,0],[2,0],[2,1]])
    tiles.append(til19)
    til20 = Tile()
    til20.setOpenSquares([[0,2],[1,2],[1,1],[2,1],[2,0]])
    tiles.append(til20)

    return tiles
