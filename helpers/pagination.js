module.exports = (objectPagination, query, countProducts) => {
  let opjectPagination = {
    currentPage: 1,
    limitItem: 4
  }
  if(query.page) {
    opjectPagination.currentPage = parseInt(query.page);
  }

  opjectPagination.skip = (opjectPagination.currentPage - 1) * opjectPagination.limitItem;


  const totalPage = Math.ceil(countProducts/opjectPagination.limitItem);
  opjectPagination.totalPage = totalPage;
  return opjectPagination;
}