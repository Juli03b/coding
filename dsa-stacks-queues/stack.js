/** Node: node for a stack. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Stack: chained-together nodes where you can
 *  remove from the top or add to the top. */

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** push(val): add new value to end of the stack. Returns undefined. */

  push(val) {
    const newNode = new Node(val);
    if(this.first) newNode.next = this.first.next;
    if(!this.last) this.last = newNode;
    this.first = newNode;
    this.size++;
  }

  /** pop(): remove the node from the top of the stack
   * and return its value. Should throw an error if the stack is empty. */

  pop() {
    if(this.isEmpty()) throw new Error("Queue is empty");
    let dequeuedNodeVal;
    
    if(this.first){
      dequeuedNodeVal = this.first.val;
      this.first = this.first.next;
    }else{
      this.last = null;
    }
    
    this.size--;

    return dequeuedNodeVal;
  }

  /** peek(): return the value of the first node in the stack. */

  peek() {
    if(this.isEmpty()) throw new Error("Queue is empty");
    return this.first.val;
  }

  /** isEmpty(): return true if the stack is empty, otherwise false */

  isEmpty() {
    if(!this.size) return true;
    return false
  }
}

module.exports = Stack;
