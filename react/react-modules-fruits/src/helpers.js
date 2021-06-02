const choice = items => {
    const randIdx = Math.floor(Math.random() * items.length);
    return items[randIdx];
}

const remove = (items, item) => {
    const itmIdx = ~items.indexOf(item);
    if(itmIdx){
        items = items.splice(itmIdx, 1);
        return item;
    }
}

export {choice, remove};