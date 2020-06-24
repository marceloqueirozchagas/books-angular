import Book from './Book.model';

interface Author {
    name: string,
    show_books: boolean,
    total_books: number,
    total_pages: number,
    books: Book []
}

export default Author;