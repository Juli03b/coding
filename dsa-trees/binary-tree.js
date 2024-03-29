/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    const nodeStack = [this.root]
    let currentLength = this.root ? 1 : 0;
    let shortestLength = currentLength;
    let left = true;

    while(nodeStack.length){
      const currentNode = nodeStack.pop();
      
      if(currentNode) {
        if(left){
          if(currentNode.left){
            nodeStack.push(currentNode.left)
            currentLength += 1;
          }else{
            if(shortestLength < currentLength) shortestLength = currentLength;
            left = false;
          }
        }else{
          if(currentNode.right){
            nodeStack.push(currentNode.right)
            currentLength += 1;
          }else{
            if(shortestLength < currentLength) shortestLength = currentLength;
            left = true;
          }
        }
      };
    }
    return shortestLength;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. 
   * 
   * Idea:
   *  DFS. Make a stack, store nodes with a depth value in an array. Keep traversing.
   *  Add nodes to the stack with current node depth, plus 1
   * */
  
  maxDepth() {
    if(!this.root) return 0;

    // Store nodes with their depth, because we could traverse opposite sides
    const nodeStack = [[this.root, 1]];
    let currentMaxDepth = 0; 

    while(nodeStack.length){
      const [{left, right}, depth] = nodeStack.pop();

      // If node is a leaf node and node stack is exhausted, return max depth. 
      if(!left && !right && !nodeStack.length) return currentMaxDepth;
      // Else, if leaf node, set max depth to current depths
      if(!left && !right) currentMaxDepth = depth

      if(right) nodeStack.push([right, depth + 1]);
      if(left) nodeStack.push([left, depth + 1]);
    }
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once.
   * 
   * Idea:
   *  Do dfs, add nodes to the stack with the current node's sum plus left and/or right value.
   *  
   *  NOT COMPLETE: Does not handle negative values.
   */

  maxSum() {
    if(!this.root) return 0;

    // Store nodes with their sums, because we could traverse opposite sides
    const nodeStack = [[this.root, this.root.val]];
    let currentMaxSum = 0; 

    while(nodeStack.length){
      const [{left, right, val}, currentSum] = nodeStack.pop();

      if(!left && !right && currentSum > currentMaxSum) currentMaxSum = currentSum;
      if(!left && !right && !nodeStack.length) return currentMaxSum + val;

      if(left) nodeStack.push([left, left.val + currentSum])
      if(right) nodeStack.push([right, right.val + currentSum])
    }
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. 
   * */

  nextLarger(lowerBound) {
    if(!this.root) return null;
    const nodeStack = [this.root];
    let lowest = this.root.val;
    
    while(nodeStack.length){
      const {left, right, val} = nodeStack.pop();

      if(val < lowest && val > lowerBound) lowest = val;
      if(right) nodeStack.push(right);
      if(left) nodeStack.push(left);
    }

    return lowest > lowerBound ? lowest : null;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if(!node1 || !node2) return;

    const nodeStack = [[this.root, 1, this.root]];

    while(nodeStack.length){
      const [currentNode, depth, parentNode] = nodeStack.pop();
      const {left, right} = currentNode;

      if(currentNode === node1){
        node1.depth = depth;
        node1.parent = parentNode;
      }else if(currentNode === node2) {
        node2.depth = depth;
        node2.parent = parentNode;
      }

      if(right) nodeStack.push([right, depth + 1, currentNode]);
      if(left) nodeStack.push([left, depth + 1, currentNode]);
    }

    return (node1.depth === node2.depth) && (node1.parent !== node2.parent) ;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
