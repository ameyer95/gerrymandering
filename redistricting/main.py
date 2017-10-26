import region
import tiler

def main():
    grid = region.Region(10)
    tileSet = region.makeTiles()
    tilings = tiler.getAllTilings(grid,tileSet)
    print len(tilings)

if __name__ == '__main__':
    main()