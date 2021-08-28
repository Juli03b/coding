/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    const nodeStack = [this.root];
    let sum = 0;
    
    while(nodeStack.length){
      const currentNode = nodeStack.pop();
      
      if(currentNode) {
        sum += currentNode.val;
        nodeStack.push(...currentNode.children);
      };
    }

    return sum;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    const nodeStack = [this.root];
    let sum = 0;
    
    while(nodeStack.length){
      const currentNode = nodeStack.pop();
      if(currentNode) {
        if(currentNode.val % 2 === 0) sum++;
        nodeStack.push(...currentNode.children);
      };
    }

    return sum;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    const nodeStack = [this.root];
    let count = 0;
    
    while(nodeStack.length){
      const currentNode = nodeStack.pop();
      if(currentNode) {
        if(currentNode.val > lowerBound) count++;
        nodeStack.push(...currentNode.children);
      };
    }

    return count;
  }
}

module.exports = { Tree, TreeNode };
