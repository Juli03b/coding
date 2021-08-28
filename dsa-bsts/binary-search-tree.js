class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);
    if(!this.root){
      this.root = newNode;
      return this; 
    }

    let currentNode = this.root;
    while (currentNode) {
      if(currentNode.val > val){
        if(!currentNode.left) {
          currentNode.left = newNode;
          return this;
        }
        currentNode = currentNode.left;
      }else if(currentNode.val < val){
        if(!currentNode.right) {
          currentNode.right = newNode;
          return this;
        }
        currentNode = currentNode.right;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, currentNode=this.root) {
    const newNode = new Node(val);
    if(!this.root){
      this.root = newNode;
      return this; 
    }
    if(!currentNode) return 0;
    if(currentNode.val > val){
      if(!currentNode.left) {
        currentNode.left = newNode;
        return this;
      }
      this.insertRecursively(val, currentNode.left);
    }else if(currentNode.val < val){
      if(!currentNode.right) {
        currentNode.right = newNode;
        return this;
      }
      this.insertRecursively(val, currentNode.right);
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let currentNode = this.root;

    while(currentNode){
      if(currentNode.val > val){
        if(!currentNode.left) return ;
        if(currentNode.left.val === val) return currentNode.left;

        currentNode = currentNode.left
      }else if(currentNode.val < val){
        if(!currentNode.right) return ;
        if(currentNode.right.val === val) return currentNode.right;

        currentNode = currentNode.right
      }
    }

    return;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, currentNode=this.root) {
    if(currentNode.val > val){
      if(!currentNode.left) return ;
      if(currentNode.left.val === val) return currentNode.left;
      this.findRecursively(val, currentNode.left)
    }else if(currentNode.val < val){
      if(!currentNode.right) return ;
      if(currentNode.right.val === val) return currentNode.right;
      this.findRecursively(val, currentNode.right)
    }

    return;
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const visitedNodes = [];
    const nodeStack = [this.root];

    while(nodeStack.length){
      const currentNode = nodeStack.pop();
      const {left, right} = currentNode;
      visitedNodes.push(currentNode.val); //Root or next node

      if(right) nodeStack.push(right);// right first so it gets popped after left
      if(left) nodeStack.push(left);// left last - it will get popped first
    }

    return visitedNodes;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const visitedNodes = [];
    const nodeStack = [this.root];
    // working - except duplicates are happening
    while(nodeStack.length){
      const currentNode = nodeStack.pop();
      // console.log("current node:", currentNode, ":current node");
      console.log("STACK:", nodeStack, ":STACK");
      const {left, right} = currentNode;
      if(right) {
        nodeStack.push(right);
      }else{
        visitedNodes.push(currentNode.val);
      }// right first so it gets popped after left
      if(left){
        nodeStack.push(left);
      }else{
        visitedNodes.push(currentNode.val);
      }
    }
    console.log("VISIRTED", visitedNodes)
    return visitedNodes
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const visitedNodes = [];
    const nodeStack = [this.root];

    while(nodeStack.length){
      const currentNode = nodeStack.pop();
      const {left, right} = currentNode;

      visitedNodes.push(currentNode.val);
      if(right) {
        nodeStack.push(right);
      }else{
        visitedNodes.push(currentNode.val);
      }// right first so it gets popped after left
      if(left){
        nodeStack.push(left);
      }else{
        visitedNodes.push(currentNode.val);
      }
      //add current node
      //then right, then left to visited
    }

    return visitedNodes;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const visitedNodes = [];
    const nodeQueue = [this.root];

    while(nodeQueue.length){
      const currentNode = nodeQueue.shift();
      visitedNodes.push(currentNode.val);
      if(currentNode.left) nodeQueue.push(currentNode.left);
      if(currentNode.right) nodeQueue.push(currentNode.right);
    }
    return visitedNodes;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {

  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    
  }
}

module.exports = BinarySearchTree;
