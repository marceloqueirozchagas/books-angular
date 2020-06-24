import Book from './Book.model';

interface Year {
    year: number,
    show_books: boolean,
    total_authors: number,
    total_books: number,
    total_pages: number,
    books: Book []
}

export default Year;