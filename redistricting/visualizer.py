import region
import tiler
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns


def visualizeTile(tile):
    sns.heatmap(tile.grid, linewidths = .2, cmap = "YlGnBu", cbar = False)
    plt.yticks(rotation=0)
    plt.show()


def visualizeRegion(region):
    return None

def main():
    testtile = region.Tile()
    testtile.setOpenSquares([[0,0],[0,1],[0,2],[0,3],[0,4]]) #five vertical
    # visualizeTile(testtile)

    testregion = region.Region(10)
    testregion.addPiece(tile = testtile, tileCoords = [0,0], regionCoords = [0,0])
    print(np.array(testregion.grid))


if __name__ == "__main__":
    main()
