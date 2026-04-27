import { ListBook } from "@/constants/list_books";

const getFilteredBooks = (search) => {
  const query = search.trim().toLowerCase();
  if (!query) return ListBook;
  return ListBook.filter(
    (book) =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query),
  );
};

export { getFilteredBooks };