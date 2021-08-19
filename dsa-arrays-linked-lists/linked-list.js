/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);

    if(!this.head) {
      this.head = newNode;
    }else{
      this.tail.next = newNode;
    }

    this.tail = newNode;
    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val);

    if(!this.head){
      this.head = newNode;
      this.tail = newNode;
    }else{
      newNode.next = this.head;
      this.head = newNode;    
    }

    this.length++;
  }

  /** pop(): return & remove last item. */

  pop() {
    if(!this.head) new Error("List is empty");

    const lastNodeVal = this.tail.val;
    if(this.length === 1){
      this.head = null;
      this.tail = null;
      this.length--;

      return lastNodeVal;
    }

    let currentNode = this.head;
    if(this.length > 2){
      while(currentNode.next?.next){
        currentNode = currentNode.next;
      }
    }

    currentNode.next = null;
    this.tail = currentNode;
    this.length--;

    return lastNodeVal;
  }

  /** shift(): return & remove first item. */

  shift() {
    if(!this.head) new Error("List is empty");
    const headValue = this.head.val;

    this.head = this.head.next;
    this.length--;

    if(!this.head) this.tail = null;

    return headValue;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if(idx > this.length - 1) throw new Error("Idx is out of bounds");

    let currentNode = this.head;

    for(let arrI of Array.from({length: idx})){
      currentNode = currentNode.next;
    }

    return currentNode.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if(idx > this.length - 1) throw new Error("Idx is out of bounds");
    let currentNode = this.head;
    for(let arrI of Array.from({length: idx})){
      currentNode = currentNode.next;
    }
    currentNode.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if(idx > this.length) throw new Error("Idx is out of bounds");
    const newNode = new Node(val);
    if(!this.head){
      this.head = newNode;
      this.tail = newNode;
      this.length++;
      return undefined
    }
    let nodeAtIdx = this.head;
    for(let arrI of Array.from({length: idx - 1})){
      nodeAtIdx = nodeAtIdx.next;
    }
    const nodeAfter = nodeAtIdx.next;
    newNode.next = nodeAfter;
    nodeAtIdx.next = newNode;

    if(idx === this.length) this.tail = newNode;
    this.length++;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if(idx > this.length) throw new Error("Idx is out of bounds");
    let nodeAtIdx = this.head;
    if(idx === this.length - 1){
      const headValue = this.head;
      this.head = null;
      this.tail = null;
      this.length--;
      return headValue;
    }
    for(let arrI of Array.from({length: idx - 1})){
      nodeAtIdx = nodeAtIdx.next;
    }
    const delNodeVal = nodeAtIdx.val;
    const nodeAfterNext = nodeAtIdx.next.next;
    nodeAtIdx.next = nodeAfterNext;
  
    this.length--;
    return delNodeVal;
  }

  /** average(): return an average of all values in the list */

  average() {
    if(!this.length) return 0;
    let sum = 0;
    let currentNode = this.head;
    while(currentNode){
      sum += currentNode.val;
      currentNode = currentNode.next;
    }
    let average = sum / this.length;
    return average;
  }
}

module.exports = LinkedList;
