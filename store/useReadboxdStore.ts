import { create } from 'zustand';

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  description: string;
  publishYear: number;
}

export interface Review {
  id: string;
  bookId: string;
  reviewerName: string;
  reviewerAvatar?: string;
  rating: number;
  text: string;
  likes: number;
  comments: number;
  date: string;
}

export interface UserProfile {
  name: string;
  handle: string;
  avatar?: string;
  bio: string;
  stats: {
    totalBooks: number;
    thisYear: number;
    following: number;
    followers: number;
  };
  favoriteBookIds: string[];
}

export interface DiaryEntry {
  id: string;
  bookId: string;
  dateRead: string;
  rating?: number;
  reviewId?: string;
}

interface ReadboxdState {
  currentUser: UserProfile;
  books: Record<string, Book>;
  reviews: Record<string, Review>;
  diary: DiaryEntry[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'reviewerName' | 'reviewerAvatar' | 'likes' | 'comments'>) => void;
  addToDiary: (entry: Omit<DiaryEntry, 'id'>) => void;
}

// Dummy Data
const MOCK_BOOKS: Record<string, Book> = {
  '1': {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverUrl: 'https://covers.openlibrary.org/b/id/8444315-L.jpg',
    description: 'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
    publishYear: 1925,
  },
  '2': {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    coverUrl: 'https://covers.openlibrary.org/b/id/153256-L.jpg',
    description: 'Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that grows more haunting as its futuristic purgatory becomes more real.',
    publishYear: 1949,
  },
  '3': {
    id: '3',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverUrl: 'https://covers.openlibrary.org/b/id/8259443-L.jpg',
    description: 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.',
    publishYear: 1960,
  },
  '4': {
    id: '4',
    title: 'Dune',
    author: 'Frank Herbert',
    coverUrl: 'https://covers.openlibrary.org/b/id/11145152-L.jpg',
    description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange.',
    publishYear: 1965,
  },
  '5': {
    id: '5',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    coverUrl: 'https://covers.openlibrary.org/b/id/11516212-L.jpg',
    description: 'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish.',
    publishYear: 2021,
  }
};

const MOCK_REVIEWS: Record<string, Review> = {
  'r1': {
    id: 'r1',
    bookId: '5',
    reviewerName: 'Alex',
    rating: 5,
    text: 'Absolutely incredible sci-fi. Could not put it down.',
    likes: 42,
    comments: 5,
    date: new Date().toISOString(),
  },
  'r2': {
    id: 'r2',
    bookId: '1',
    reviewerName: 'Jordan',
    rating: 3.5,
    text: 'Classic, but the characters are all so unlikable.',
    likes: 12,
    comments: 1,
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
  }
};

export const useReadboxdStore = create<ReadboxdState>((set) => ({
  currentUser: {
    name: 'Reader 123',
    handle: '@reader123',
    bio: 'Avid reader and sci-fi enthusiast',
    stats: {
      totalBooks: 142,
      thisYear: 12,
      following: 24,
      followers: 18,
    },
    favoriteBookIds: ['4', '5', '2', '3'],
  },
  books: MOCK_BOOKS,
  reviews: MOCK_REVIEWS,
  diary: [
    { id: 'd1', bookId: '5', dateRead: new Date().toISOString(), rating: 4, reviewId: 'r1' },
    { id: 'd2', bookId: '2', dateRead: new Date(Date.now() - 86400000 * 5).toISOString() }
  ],
  
  addReview: (review) => set((state) => {
    const newId = `r${Date.now()}`;
    const newReview: Review = {
      ...review,
      id: newId,
      reviewerName: state.currentUser.name,
      reviewerAvatar: state.currentUser.avatar,
      likes: 0,
      comments: 0,
      date: new Date().toISOString(),
    };
    return {
      reviews: { ...state.reviews, [newId]: newReview }
    };
  }),

  addToDiary: (entry) => set((state) => ({
    diary: [{ ...entry, id: `d${Date.now()}` }, ...state.diary]
  })),
}));
