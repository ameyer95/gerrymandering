def distance(A,B,T):
    neighborsA = A.getNeighbors()
    neighborsB = B.getNeighbors()
    numberNeighbors = 0.0
    score = 0.0
    for a in neighborsA:
        for b in neighborsB:
            if T[a][b] == -1:
                d = bfs(a,b)
                T[a][b] = d
                T[b][a] = d
            else:
                d = T[a][b]
            numberNeighbors += 1
            score += d
    convexityScore = score/numberNeighbors
    return convexityScore

def bfs(a,b):
    dist = 0
    return dist

def main():
    T = []

if __name__=="main":
    main()