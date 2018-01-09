import pickle
import math
import tile

# Polsby-popper score (this is designed for circular districts so is low for everything
# Perimeter Score (can be used to calculate total perimeter measurement of a district.
# Square Reock: ratio of district area to area of smallest rectangle containing district
### note: for our districts (which are sufficiently small) convex hull is equivalent to square Reock
# isoperimetric: 16A/P^2 where A is area and P is perimeter

def main():
    polsby = getPolsbyScores(5)
    perims = getPerims(5)
    reocks = getReock(5)
    isoperimeters = isoperimetric(5)

def getPolsbyScores(n):
    scores = []
    allTiles = tile.makeAllTiles(n)
    for x in range(len(allTiles)):
        perim = perimTile(allTiles[x])
        score = 5.0/perim
        scores.append(score)
    return scores
 
def getPerims(n):
    perims = []
    allTiles = tile.makeAllTiles(n)
    for x in range(len(allTiles)):
        perim = perimTile(allTiles[x])
        perims.append(perim)
    return perims

def getReock(n):
    reocks = []
    allTiles = tile.makeAllTiles(n)
    for x in range(len(allTiles)):
        height = getHeight(allTiles[x])
        width = getWidth(allTiles[x])
        area = height * width
        reock = 5.0/area
        reocks.append(reock)
    return reocks

def isoperimetric(n):
    isopers = []
    allTiles = tile.makeAllTiles(n)
    for x in range(len(allTiles)):
        perim = perimTile(allTiles[x])
        isoScore = 80.0/(perim*perim)#note: 16*5 = 80
        isopers.append(isoScore)
    return isopers

def getHeight(tile):
    minX = 4
    maxX = 0
    openTile = tile.getFilledCells()
    for cell in openTile:
        if cell[0] < minX:
            minX = cell[0]
        if cell[0] > maxX:
            maxX = cell[0]
    diff = maxX - minX
    height = diff + 1.0
    return height

def getWidth(tile):
    minY = 4
    maxY = 0
    openTile = tile.getFilledCells()
    for cell in openTile:
        if cell[1] < minY:
            minY = cell[1]
        if cell[1] > maxY:
            maxY = cell[1]
    diff = maxY - minY
    width = diff + 1.0
    return width

def perimTile(tile):
    openTile = tile.getFilledCells()
    perim = 0
    for cell in openTile:
        if cell[0]==0 or [cell[0]-1,cell[1]] not in openTile:
            perim = perim + 1
        if cell[0]==4 or [cell[0]+1,cell[1]] not in openTile:
            perim = perim + 1
        if cell[1]==0 or [cell[0],cell[1]-1] not in openTile:
            perim = perim + 1
        if cell[1]==4 or [cell[0],cell[1]+1] not in openTile:
            perim = perim + 1
    return perim

if __name__== '__main__':
    main()
    