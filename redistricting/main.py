import region
import tile
import tiler
import sys
import pickle

def main():
    sys.setrecursionlimit(13000)
    grid = region.Region(3)
    tileSet = tile.makeAllTiles(3)
    tilings = tiler.getAllTilings(grid,tileSet)
    print len(tilings)
    f = open("Threeby3tilings.P", "w+")
    pickle.dump(tilings, f)
    f.close()
    for x in range(10):
        print tilings[x]
    h = open("Threeby3tilings.P", "r")
    g = pickle.load(h)
    for x in range(10):
        print g[x]
    #note: works correctly (return 2 tilings) when region is 2x2 and we use districts of size 2
    #can reset recursion depth to 13000 (but still not sufficient), 14000 crashes it

if __name__ == '__main__':
    main()