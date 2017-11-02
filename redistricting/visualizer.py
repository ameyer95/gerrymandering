import region
import tiler
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns


def visualizeTile(tile):
    sns.heatmap(tile.grid, linewidths = .4, cmap = "YlGnBu", cbar = False)
    plt.yticks(rotation=0)
    plt.show()


def visualizeRegion(region):
    sns.heatmap(region.grid, linewidths = .2, cmap = "YlGnBu", cbar = False)
    plt.yticks(rotation=0)
    plt.show()

def main():
    testtile1 = region.Tile()
    testtile1.setOpenSquares([[0,0],[0,1],[0,2],[0,3],[0,4]])

    testtile2 = region.Tile()
    testtile2.setOpenSquares([[0,0],[1,0],[2,0],[3,0],[4,0]])

    testregion = region.Region(10)
    testregion.addPiece(tile = testtile1, tileCoords = [0,0], regionCoords = [0,0])
    testregion.addPiece(tile = testtile2, tileCoords = [1,3], regionCoords = [1,1])
    print(np.array(testregion.grid))
    visualizeRegion(testregion)


if __name__ == "__main__":
    main()
