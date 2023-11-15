/*
 * Filename: complex_code.js
 * Description: This code demonstrates a complex implementation of a graph data structure
 */

class Graph {
  constructor() {
    this.nodes = new Map();
  }

  addNode(node) {
    this.nodes.set(node, new Map());
  }

  addEdge(source, destination, weight) {
    if (!this.nodes.has(source) || !this.nodes.has(destination)) {
      throw new Error('Source or destination node does not exist in the graph');
    }

    this.nodes.get(source).set(destination, weight);
    this.nodes.get(destination).set(source, weight);
  }

  removeNode(node) {
    if (!this.nodes.has(node)) {
      throw new Error('Node does not exist in the graph');
    }

    this.nodes.delete(node);
    for (let adjacentNode of this.nodes.values()) {
      adjacentNode.delete(node);
    }
  }

  removeEdge(source, destination) {
    if (!this.nodes.has(source) || !this.nodes.has(destination)) {
      throw new Error('Source or destination node does not exist in the graph');
    }

    this.nodes.get(source).delete(destination);
    this.nodes.get(destination).delete(source);
  }

  getNeighbors(node) {
    if (!this.nodes.has(node)) {
      throw new Error('Node does not exist in the graph');
    }

    return this.nodes.get(node);
  }

  depthFirstSearch(startNode) {
    const visited = new Set();
    const stack = [startNode];

    while (stack.length > 0) {
      const current = stack.pop();

      if (!visited.has(current)) {
        visited.add(current);
        console.log('Visited node:', current);

        for (let neighbor of this.getNeighbors(current).keys()) {
          stack.push(neighbor);
        }
      }
    }
  }

  breadthFirstSearch(startNode) {
    const visited = new Set();
    const queue = [startNode];

    while (queue.length > 0) {
      const current = queue.shift();

      if (!visited.has(current)) {
        visited.add(current);
        console.log('Visited node:', current);

        for (let neighbor of this.getNeighbors(current).keys()) {
          queue.push(neighbor);
        }
      }
    }
  }
}

// Creating a graph
const graph = new Graph();

// Adding nodes
graph.addNode('A');
graph.addNode('B');
graph.addNode('C');
graph.addNode('D');
graph.addNode('E');

// Adding edges
graph.addEdge('A', 'B', 5);
graph.addEdge('B', 'C', 7);
graph.addEdge('C', 'D', 3);
graph.addEdge('D', 'E', 2);
graph.addEdge('E', 'A', 4);

// Removing a node
graph.removeNode('C');

// Removing an edge
graph.removeEdge('D', 'E');

// Performing depth-first search
console.log('Depth-First Search:');
graph.depthFirstSearch('A');

// Performing breadth-first search
console.log('Breadth-First Search:');
graph.breadthFirstSearch('A');