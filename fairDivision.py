#fairDivision.py

def main():
    region = getRegion()
    maps = []
    maps.extend(horizDivision(region))
    maps.extend(vertDivision(region))
    maps.extend(diagDivision(region))
    ranking1 = compactnessAlg(maps)
    ranking2 = efficiencyAlg(maps)
    x = findMinRanking(ranking1,ranking2)
    if (ranking2.index(ranking1[x]) > x):
        #determine whether x refers to index in ranking1 or ranking2
        winner = ranking2[x]
    else:
        winner = ranking1[x]
    
def compactnessAlg(maps):
    scores = []
    rankings = []
    for plan in maps:
        scores.append(scoreCompactness(plan))
    for x in range(0,len(maps)):
        lowestIndex = -1
        lowest = 2
        for y in range(0,len(scores)):
            if scores[y] < lowest:
                lowestIndex = y
                lowest = scores[y]
        #relies on assumption that no two districts score the same
        rankings.insert(x, scores.index(lowest))
        scores[scores.index(lowest)] = 2
    return rankings
        
def efficiencyAlg(maps):
    scores = []
    rankings = []
    for plan in maps:
        scores.append(scoreEfficiency(plan))
    for x in range(0,len(maps)):
        lowestIndex = -1
        lowest = 2
        for y in range(0,len(scores)):
            if scores[y] < lowest:
                lowestIndex = y
                lowest = scores[y]
        rankings.insert(x, scores.index(lowest))
        scores[scores.index(lowest)] = 2
    return rankings
        
def scoreCompactness(plan):
    #computes the compactness of a given districting plan
    #compactness is usually a district-by-district measure so might need to call a separate function for 
    #each district and then combine the results into a single value between 0 and 1
    return 1
    
def scoreEfficiency(plan):
    #computes the efficiency gap of a given districting plan. currently set up for a score between 0 and 1
    return 1

def compactnessSim(region):
    # run a simulation to draw districts with respect to an algorithm that prioritizes compactness
    return region

def efficiencySim(region):
    # run a simulation to draw districts with respect to an algorithm that prioritizes minimizing the efficiency gap
    return region

def horizDivision(region):
    plans = []
    for x in range(1,5):
        half1, half2 = drawLine(region,x)
        plan1 = compactnessSim(half1)
        plan2 = efficiencySim(half2)
        plan = merge(plan1, plan2)
        plans.append(plan)
    return plans

def vertDivision(region):
    plans = []
    region = turn90(region)
    for x in range(1,5):
        half1,half2 = drawLine(region,x)
        plan1 = compactnessSim(half1)
        plan2 = efficiencySim(half2)
        plan = merge(plan1,plan2)
        fixedPlan = turnback90(plan)
        plans.append(fixedPlan)
    return plans

def diagDivision(region):
    plans = []
    region = turn45(region)
    for x in range(1,5):
        half1, half2 = drawLine(region,x)
        plan1 = compactnessSim(half1)
        plan2 = efficiencySim(half2)
        plan = merge(plan1,plan2)
        fixedPlan = turnback45(plan)
        plans.append(fixedPlan)
    region = turn90(region)
    for x in range(1,5):
        half1,half2 = drawLine(region,x)
        plan1 = compactnessSim(half1)
        plan2 = efficiencySim(half2)
        plan = merge(plan1,plan2)
        fixedPlan = turnback90(plan)
        fixedPlan = turnback45(fixedPlan)
        plans.append(fixedPlan)
    return plans

def drawLine(region,x):
    #divide region into two halves along a roughly vertical line such that x/5 regions are in half 1 and 
    # (5-x)/5 regions are in half 2
    return region, region

def merge(half1, half2):
    #combines the districting info from half 1 and half 2 into a single map, essentially glues the two regions together
    #alternatively could do all the computations on the original region map and be able to avoid this step
    return half1

def turn90(region):
    #rotate the region, along with its geographic/demographic data clockwise 90 degrees.
    return region

def turn45(region):
    #rotate the region, along with its geographic/demographic data clockwise 45 degrees. *Note: if region was a square it will now be a diamond.
    return region

def turnback90(region):
    #rotate a region along with its geographic/demographic/district data counterclockwise 90 degrees
    return region

def turnback45(region):
    #rotate a region along with its geographic/demographic/district data counterclockwise 45 degrees
    return region

def findMinRanking(ranking1, ranking2):
#takes two rankings (index 0 is the location of the best map, index 1 is the location of the second best map, etc
#returns the location of the map that is the best compromise
    bestWorst = len(ranking1)
    for x in range(0,len(ranking1)):
        value = ranking1[x]
        list2Index = ranking2.index(value)
        if max(x,list2Index) < bestWorst:
            bestWorst = max(x,list2Index)
    return bestWorst

def getRegion():
    #generate a random matrix of 0's and 1's, for now?
    return 

main()