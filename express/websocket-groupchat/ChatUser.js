
const JOKES = ['Which cow is the smartest', 'Helloo', 'JOKe', 'Funny', "HAHA"];
const randArrItm = arr => {
  const randIdx = Math.floor(Math.random() * arr.length);
  return arr[randIdx];
}

/** Functionality related to chatting. */

// Room is an abstraction of a chat channel
const Room = require('./Room');

/** ChatUser is a individual connection from client -> server to chat. */

class ChatUser {
  /** make chat: store connection-device, rooom */

  constructor(send, roomName) {
    this._send = send; // "send" function for this user
    this.room = Room.get(roomName); // room user will be in
    this.name = null; // becomes the username of the visitor

    console.log(`created chat in ${this.room.name}`);
  }

  /** send msgs to this client using underlying connection-send-function */

  send(data) {
    try {
      this._send(data);
    } catch {
      // If trying to send to a user fails, ignore it
    }
  }

  /** handle joining: add to room members, announce join */

  handleJoin(name) {
    this.name = name;
    this.room.join(this);
    this.room.broadcast({
      type: 'note',
      text: `${this.name} joined "${this.room.name}".`
    });
  }

  /** handle a chat: broadcast to room. */

  handleChat(text) {
    this.room.broadcast({
      name: this.name,
      type: 'chat',
      text: text
    });
  }

  handleCommand(text) {
    const [command, data, other] = text.split(' ');
    const commands = {
      "/joke" : () => this.send(JSON.stringify({type: "note", text: randArrItm(JOKES)})),
      "/joke-all" : () => this.room.broadcast({type: "note", text: randArrItm(JOKES)}),
      "/members" : () => this.send(JSON.stringify({type: "note", text: "Members: " + this.room.memberNames()})),
      "/private" : (name, msg) => this.room.findUser(name).send(JSON.stringify({name: `PM from ${this.name}`, type: "chat", text: msg})),
      "/name" : (name) => (this.name = name, this.send(JSON.stringify({type: "note", text: "Your username is now " + this.name})))
    }

    commands[command](data, other);
  }

  /** Handle messages from client:
   *
   * - {type: "join", name: username} : join
   * - {type: "chat", text: msg }     : chat
   */

  handleMessage(jsonData) {
    let msg = JSON.parse(jsonData);
    console.log(msg)
    if (msg.type === 'join') this.handleJoin(msg.name);
    else if (msg.type === 'chat') this.handleChat(msg.text);
    else if (msg.type === 'command') this.handleCommand(msg.text);
    else throw new Error(`bad message: ${msg.type}`);
  }

  /** Connection was closed: leave room, announce exit to others */

  handleClose() {
    this.room.leave(this);
    this.room.broadcast({
      type: 'note',
      text: `${this.name} left ${this.room.name}.`
    });
  }
}

module.exports = ChatUser;
