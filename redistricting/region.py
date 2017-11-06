import tiler
import tile

class Region:
    def __init__(self,length):
        self.sideLength = length
        self.grid = [[0 for x in range(length)] for y in range(length)]

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
            self.grid[regionCoords[0] - xDiff][regionCoords[1] - yDiff] = tile.index

    def removePiece(self, tile, tileCoords, regionCoords):
        xCoordTile = tileCoords[0]
        yCoordTile = tileCoords[1]
        filledTileCells = tile.getFilledCells()
        for filledCell in filledTileCells:
            xDiff =  filledCell[0] - xCoordTile
            yDiff =  filledCell[1] - yCoordTile
            self.grid[regionCoords[0] - xDiff][regionCoords[1] - yDiff] = 0

    def reset(self):
        for x in range(self.sideLength):
            for y in range(self.sideLength):
                self.grid[x][y] = 0





