const getCurrentPage = (currentPage: number, totalPages: number) => {
  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }
  return currentPage;
};

const getFirstLastPages = (
  currentPage: number,
  totalPages: number,
  maxPages: number
) => {
  let startPage: number, endPage: number;
  if (totalPages <= maxPages) {
    startPage = 1;
    endPage = totalPages;
  } else {
    let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
    let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrentPage) {
      startPage = 1;
      endPage = maxPages;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      startPage = totalPages - maxPages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  return { startPage, endPage };
};

const getFirstLastIndex = (
  currentPage: number,
  totalItems: number,
  pageSize: number
) => {
  let startIndex = (currentPage - 1) * pageSize;
  let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
  return { startIndex, endIndex };
};

const getPages = (startPage: number, endPage: number) => {
  return Array.from(Array(endPage + 1 - startPage).keys()).map(
    (i) => startPage + i
  );
};

export const paginate = (
  totalItems: number,
  currentPage: number = 1,
  pageSize: number = 10,
  maxPages: number = 10
) => {
  let totalPages = Math.ceil(totalItems / pageSize);

  currentPage = getCurrentPage(currentPage, totalPages);

  let { startPage, endPage } = getFirstLastPages(
    currentPage,
    totalPages,
    maxPages
  );

  // let { startIndex, endIndex } = getFirstLastIndex(currentPage, totalItems, pageSize);

  let pages = getPages(startPage, endPage);

  return pages;
};

export const fetchData = async (data: any, query: string) => {
  let q = `?_page=${data.page}&_limit=${data.size}`;

  if (query !== '') {
    q = `?${query}`;
  }

  let url = `http://localhost:5000/users${q}`;
  const response = await fetch(url);
  return response.json();
};

export const fetchCount = async () => {
  let url = `http://localhost:5000/users`;
  const response = await fetch(url);
  return response.json();
};
