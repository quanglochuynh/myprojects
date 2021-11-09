import numpy as np 
from math import *
import matplotlib.pyplot as plt
import networkx as nx
import random as rd

## Variables

order = ['-','-','+','+','+']

weight = [25, 45, 10, 12, 8]

data = np.array([
                [120, 284, 5, 3.5, 18], 
                [150, 269, 2, 4.5, 24], 
                [100, 413, 4, 5.5, 17], 
                [60, 596, 6, 8, 20], 
                [30, 1321, 8, 7.5, 16], 
                [80, 734, 5, 4, 21], 
                [45, 982, 7, 8.5, 13]
                ])
                
d1 = [100, 1000, 6, 5, 10]
d2 = [80, 800, 4, 4, 7]

c0, c1, c2 = 0.50, 0.55, 0.60

## Functions

def concordance(data = data, weight = weight, order = order):    
    n,m = len(data),len(data[0])
    res = []
    for i in range(n):
        ws = []
        for j in range(n):
            w = 0
            if i != j : 
                for k in range(m):
                    if order[k] == '-' and data[i][k] <= data[j][k]:
                        w+=weight[k]
                    if order[k] == '+' and data[i][k] >= data[j][k]:
                        w+=weight[k]
            ws.append(w/sum(weight))
        res.append(ws)
    return np.array(res)

def PP(data = data, weight = weight, order = order):    
    n,m = len(data),len(data[0])
    res = np.zeros((n,n))
    for i in range(n):
        for j in range(n):
            Pp = 0
            Pm = 0
            if i != j : 
                for k in range(m):
                    if ( order[k] == '-' and data[i][k] < data[j][k] ) or ( order[k] == '+' and data[i][k] > data[j][k] ):
                        Pp+=weight[k]
                    elif ( order[k] == '-' and data[i][k] > data[j][k] ) or ( order[k] == '+' and data[i][k] < data[j][k] ):
                        Pm+=weight[k]
                res[i,j] = Pp/Pm
    return res
    

def threshold_c(data = concordance(), c0 = c0, c1 = c1, c2 = c2):    
    n,m = len(data),len(data[0])
    res = []
    for i in range(n):
        tmp = []
        for j in range(m):
            if c0 <= data[i][j] < c1:
                tmp.append('f')
            elif c1 <= data[i][j] < c2:
                tmp.append('m')
            elif c2 <= data[i][j] <= 1:
                tmp.append('F')
            else:
                tmp.append('0')
        res.append(tmp)
    return np.array(res)
    
def discordance(data = data, weight = weight, order = order):    
    n,m = len(data),len(data[0])
    res = []
    for i in range(n):
        for j in range(n):
            if i != j : 
                tmp = [[i+1,j+1]]
                for k in range(m):
                    diff = data[i][k] - data[j][k] 
                    if order[k] == '-' and diff > 0:
                        disc = diff
                    elif order[k] == '+' and diff < 0:
                        disc = -diff
                    else:
                        disc = 0
                    tmp.append(disc)
                res.append(tmp)
    return np.array(res)
    
def threshold_d(data = discordance(), d1 = d1, d2 = d2):    
    n,m = len(data),len(data[0])
    res = []
    
    #Classement
    for i in range(n):
        f = True
        moy = False
        F = False
        
        for j in range(1,m):
            
            if d1[j-1] >= data[i][j] >= d2[j-1]:
                f = False
                moy = True
            elif data[i][j] > d1[j-1]:
                f = False
                F = True
        
        if F:
            res.append([data[i][0], "F"])
        elif moy:
            res.append([data[i][0], "m"])
        else:
            res.append([data[i][0], "f"])
    
    # Mise en forme 
    
    tmp = np.zeros_like(concordance(), dtype=str)
    
    for k in range(n):
        i,j = res[k][0][0], res[k][0][1]
        tmp[i-1][j-1] = res[k][1]
    
    
    return np.array(tmp)
    
def graphe_fort(C = threshold_c(), D = threshold_d()):    
    n,m = len(C),len(C[0])
    grph = np.zeros_like(C, dtype=int)
    
    for i in range(n):
        for j in range(m):
            if i != j:
                #print(C[i,j], D[i,j])
                if ( C[i,j] == 'F' and (D[i,j] == 'm' or D[i,j] == 'f')) or ( (C[i,j] == 'm' or C[i,j] == 'F') and D[i,j] == 'f'):
                    grph[i,j] = 1
    
    return grph

def graphe_faible(C = threshold_c(), D = threshold_d(), graphe_fort = graphe_fort()):    
    n,m = len(C),len(C[0])
    grph = np.zeros_like(C, dtype=int)
    
    for i in range(n):
        for j in range(m):
            if i != j:
                #print(C[i,j], D[i,j])
                if (C[i,j] == 'f' or C[i,j] == 'm' or C[i,j] == 'F')   and (D[i,j] == 'm' or D[i,j] == 'f'):
                    if graphe_fort[i,j] != 1:
                        grph[i,j] = 1
    
    return grph

    
def edges(graphe):
    n,m = len(graphe),len(graphe[0])
    res = []
    
    for i in range(n):
        for j in range(m):
            if graphe[i][j] == 1:
                res.append([i+1,j+1])
    return res

def compute_graphs(grph_F = graphe_fort(), grph_f = graphe_faible()):    
    #Graphe fort
    GF=nx.DiGraph()
    GF.add_nodes_from([i for i in range(1,8)])
    GF.add_edges_from(edges(grph_F))
    
    #Graphe faible
    Gf=nx.DiGraph()
    Gf.add_nodes_from([i for i in range(1,8)])
    Gf.add_edges_from(edges(grph_f))
    
    return GF,Gf


def plot_graphs(graphs = compute_graphs()):    
    GF, Gf = graphs
    
    pos = {1:(2,1), 2:(4,1), 3:(5,2), 4:(4,3), 5:(1,3), 6:(1,2), 7:(3,4)}

    plt.figure(1)
    nx.draw_networkx_nodes(GF, pos, node_size = 500)
    nx.draw_networkx_labels(GF, pos)
    nx.draw_networkx_edges(GF, pos, arrows=True)
    plt.title("Graphe fort")
    plt.show() # display

    plt.figure(2)
    nx.draw_networkx_nodes(Gf, pos, node_size = 500)
    nx.draw_networkx_labels(Gf, pos)
    nx.draw_networkx_edges(Gf, pos, arrows=True, style="dashed")
    plt.title("Graphe faible")
    plt.show() # display
    
    return GF, Gf
    
#plot_graphs()

def preprocessor(G):    
    n = list(G.nodes)
    e = list(G.edges)
    
    G_dict = {}
    for node in n:
        G_dict[node] = []
    for edge in e:
        G_dict[edge[0]].append(edge[1])
    
    return G_dict

def postprocessor(G):    
    nodes = []
    e = []
    
    for n,vs in G.items():
        nodes.append(n)
        for v in vs:
            e.append([n,v])
            
    G=nx.DiGraph()
    G.add_nodes_from(nodes)
    G.add_edges_from(e)
    
    return G



def dfs(graph, start, end):    
    fringe = [(start, [])]
    while fringe:
        state, path = fringe.pop()
        if path and state == end:
            yield path
            continue
        for next_state in graph[state]:
            if next_state in path:
                continue
            fringe.append((next_state, path+[next_state]))

def cycle(GF, Gf):    
    cycles = [path  for node in GF for path in dfs(GF, node, node)]
    if cycles:
        cycle = max(cycles,key=len)
    else:
        cycle = []
    
    Grs = []
    
    for G in [GF, Gf]:
        Gr = {}
        for n,vs in G.items():
            if n in cycle:
                Gr["g"] = []
                for v in vs:
                    if v not in cycle and "g" not in Gr["g"]:
                        Gr["g"].append(v)
            else:
                Gr[n] = []
                for v in vs:
                    if v in cycle:
                        if "g" not in Gr[n]:
                            Gr[n].append("g")
                    else:
                        Gr[n].append(v)
        Grs.append(Gr)
    
    return Grs

def compute_red_graphs(grph_F = graphe_fort(), grph_f = graphe_faible()):    
    GF, Gf = compute_graphs(grph_F, grph_f)
    
    GF = preprocessor(GF)
    Gf = preprocessor(Gf)
    Grs = cycle(GF, Gf)
    GFr, Gfr = Grs[0], Grs[1]
    return GFr, Gfr
    
GFr, Gfr = compute_red_graphs()

def plot_red(GFr = GFr, Gfr = Gfr):    
    GFr = postprocessor(GFr)
    Gfr = postprocessor(Gfr)
    
    pos = {2:(4,1), 4:(4,3), 5:(1,3), 7:(3,4), "g":(1,2)}
    
    plt.figure(1)
    nx.draw_networkx_nodes(GFr, pos, node_size = 500)
    nx.draw_networkx_labels(GFr, pos)
    nx.draw_networkx_edges(GFr, pos, arrows=True)
    plt.title("Graphe fort reduit")
    plt.show()


    plt.figure(2)
    nx.draw_networkx_nodes(Gfr, pos, node_size = 500)
    nx.draw_networkx_labels(Gfr, pos)
    nx.draw_networkx_edges(Gfr, pos, arrows=True, style="dashed")
    plt.title("Graphe faible reduit")
    
    plt.show()

def sort_actions(GFr = GFr, Gfr = Gfr):
    classement = []
    
    i=0
    
    while GFr and i < 100:
        i+=1
        B = [] 
        
        surclassesF = [] 
        
        for vs in GFr.values():
            for v in vs:
                surclassesF.append(v)
        for n in GFr.keys():
            if n not in surclassesF:
                B.append(n)
        
        A1 = []
        surclassesf = []
        
        for n, vs in Gfr.items():
            if n in B:
                for v in vs:
                    surclassesf.append(v)
        for n in B:
            if n not in surclassesf:
                A1.append(n)
                GFr.pop(n)
                Gfr.pop(n)
    
        classement.append(A1)
    
    return classement

def compute_custom(data = data, w = weight, c0 = c0, c1 = c1, c2 = c2, d1 = d1, d2 = d2):
    conc = concordance(data = data, weight = w)
    disc = discordance(data = data, weight = w)
    t_c = threshold_c(data = conc, c0 = c0, c1 = c1, c2 = c2)
    t_d = threshold_d(data = disc, d1 = d1, d2 = d2)
    grph_F = graphe_fort(C = t_c, D = t_d)
    
    grph_f = graphe_faible(C = t_c, D = t_d, graphe_fort = grph_F)
    
    GFr, Gfr = compute_red_graphs(grph_F,grph_f)
    
    return sort_actions(GFr = GFr, Gfr = Gfr)

## Robustesse

def robustesse_poids():    
    order = compute_custom()
    
    
    w = [25, 45, 10, 12, 8]
    
    layer1 = 100
    layer2 = []
    layer3 = []
    
    for i in range(len(w)):
        same_order = []
        w = [25, 45, 10, 12, 8]
        for j in np.arange(0,100,1,dtype=int):
            w[i] = j
            new_order = compute_custom(w = w)
            if new_order == order:
                same_order.append(1)
            else:
                same_order.append(0)
        layer2.append(max(loc for loc, val in enumerate(same_order) if val == 1))
        layer3.append(min(loc for loc, val in enumerate(same_order) if val == 1))
    
    y_pos = np.arange(len(w))
    fig = plt.figure(figsize=(10,8))
    ax = fig.add_subplot(111)
    ax.barh(y_pos, layer1,color='grey',align='center')
    ax.barh(y_pos, layer2,color='g',align='center')
    ax.barh(y_pos, layer3,color='grey',align='center')
    
    
    ax.set_yticks(y_pos)
    ax.set_xlabel('Poids')
    ax.set_ylabel('Critere')
    
    plt.show()
    
def robustesse_seuils_c(): 
    order = compute_custom()
    
    
    c = [0.5, 0.55, 0.6]
    
    layer1 = 1
    layer2 = []
    layer3 = []
    
    for i in range(3):
        same_order = []
        c = [0.5, 0.55, 0.6]
        for j in np.arange(0,1,0.01):
            c[i] = j
            new_order = compute_custom(c0 = c[0], c1 = c[1], c2 = c[2])
            if new_order == order:
                same_order.append(1)
            else:
                same_order.append(0)
        layer2.append(max(loc for loc, val in enumerate(same_order) if val == 1)/100)
        layer3.append(min(loc for loc, val in enumerate(same_order) if val == 1)/100)
    
    y_pos = np.arange(3)
    fig = plt.figure(figsize=(10,8))
    ax = fig.add_subplot(111)
    ax.barh(y_pos, layer1,color='grey',align='center')
    ax.barh(y_pos, layer2,color='g',align='center')
    ax.barh(y_pos, layer3,color='grey',align='center')
    
    
    ax.set_yticks(y_pos)
    ax.set_yticklabels(['c0','c1','c2'])
    ax.set_xlabel('Seuils')
    plt.show()
        

def aleas(data,i):
    data_alea=data.copy()
    n, m = len(data), len(data[0])
    
    for a in range(n):
        for b in range(m):
            e = rd.choice((1,-1))
            data_alea[a][b] += data_alea[a][b] * e * i/100
    return data_alea
    
def robustesse_aleas(data = data):
    
    order = compute_custom()
    
    x= np.linspace(0,25,100)
    y = []
    
    for i in x:
        compteur =0
        for j in range(100):
            data_aleas = aleas(data, i)
            if order == compute_custom(data = data_aleas):
                compteur+=1
        y.append(compteur/100)
    plt.clf()
    plt.plot(x,y)
    plt.xlabel("Alea en pourcentage")
    plt.ylabel("Probabilite d'avoir le meme ordre")
    plt.title("Robustesse - Aleas sur les actions")
    plt.show()
    
## Graphes


    
def plot_all_graphs():    
    graphs = compute_graphs()
    
    GF, Gf = graphs
    
    GFr, Gfr = compute_red_graphs()
    
    pos = {1:(2,1), 2:(4,1), 3:(5,2), 4:(4,3), 5:(1,3), 6:(1,2), 7:(3,4)}

    plt.figure(1)
    plt.subplot(2,2,1)
    nx.draw_networkx_nodes(GF, pos, node_size = 500)
    nx.draw_networkx_labels(GF, pos)
    nx.draw_networkx_edges(GF, pos, arrows=True)
    plt.title("Graphe fort")

    plt.xticks([])
    plt.yticks([])

    plt.subplot(2,2,2)
    nx.draw_networkx_nodes(Gf, pos, node_size = 500)
    nx.draw_networkx_labels(Gf, pos)
    nx.draw_networkx_edges(Gf, pos, arrows=True, style="dashed")
    plt.title("Graphe faible")
    plt.xticks([])
    plt.yticks([])
    
    GFr = postprocessor(GFr)
    Gfr = postprocessor(Gfr)
    
    pos = {2:(4,1), 4:(4,3), 5:(1,3), 7:(3,4), "g":(1,2)}
    
    plt.subplot(2,2,3)
    nx.draw_networkx_nodes(GFr, pos, node_size = 500)
    nx.draw_networkx_labels(GFr, pos)
    nx.draw_networkx_edges(GFr, pos, arrows=True)
    plt.title("Graphe fort reduit")
    plt.xticks([])
    plt.yticks([])
    plt.show()


    plt.subplot(2,2,4)
    nx.draw_networkx_nodes(Gfr, pos, node_size = 500)
    nx.draw_networkx_labels(Gfr, pos)
    nx.draw_networkx_edges(Gfr, pos, arrows=True, style="dashed")
    plt.xticks([])
    plt.yticks([])
    plt.title("Graphe faible reduit")
    
    plt.show()