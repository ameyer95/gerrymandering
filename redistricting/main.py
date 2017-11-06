import region
import tile
import tiler
import sys

def main():
    sys.setrecursionlimit(13000)
    grid = region.Region(5)
    tileSet = tile.makeAllTiles(5)
    tilings = tiler.getAllTilings(grid,tileSet)
    print len(tilings)
    for x in range(10):
        print tilings[x].grid

    #note: works correctly (return 2 tilings) when region is 2x2 and we use districts of size 2
    #can reset recursion depth to 13000 (but still not sufficient), 14000 crashes it

if __name__ == '__main__':
    main()