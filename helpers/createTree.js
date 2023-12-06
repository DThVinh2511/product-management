let count = 0;
const createTree = (records, parent = "") => {
  let tree = [];
  records.forEach(item => {
    if(item.parent_id === parent){
      count++;
      const newItem = item;
      newItem.index = count;
      const a = createTree(records, item.id);
      if(a.length > 0){
        newItem.children = a;
      }
      tree.push(newItem);
    }
  });
  return tree;
}

module.exports.tree = (records, parent = "") => {
  count = 0;
  const tree = createTree(records, parent = "");
  return tree;
}