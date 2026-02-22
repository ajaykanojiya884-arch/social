// Mock data for initial app testing
export const MOCK_POSTS = [
  {
    id: 'mock-1',
    author: 'Sarah Johnson',
    content:
      'Just launched my new portfolio website! Excited to share my latest projects with everyone. Check it out and let me know what you think!',
    timestamp: new Date().getTime() - 2 * 60 * 60 * 1000, // 2 hours ago
    likes: 12,
    likedBy: [],
    comments: [
      {
        id: 'comment-1',
        author: 'Alex Chen',
        text: 'Looks amazing! Love the design.',
        timestamp: new Date().getTime() - 1.5 * 60 * 60 * 1000,
      },
    ],
  },
  {
    id: 'mock-2',
    author: 'Mike Rodriguez',
    content:
      'Remember: The best time to start learning React was yesterday. The second best time is today! Who else is learning web development?',
    timestamp: new Date().getTime() - 5 * 60 * 60 * 1000, // 5 hours ago
    likes: 25,
    likedBy: [],
    comments: [
      {
        id: 'comment-2',
        author: 'Emma Williams',
        text: 'Great motivation! Starting my React journey today.',
        timestamp: new Date().getTime() - 4.5 * 60 * 60 * 1000,
      },
      {
        id: 'comment-3',
        author: 'John Smith',
        text: 'Vite makes development so fast!',
        timestamp: new Date().getTime() - 4 * 60 * 60 * 1000,
      },
    ],
  },
  {
    id: 'mock-3',
    author: 'Emma Williams',
    content:
      'Had an amazing day at the tech conference! Met so many incredible developers and learned about the latest trends in web development. Feeling inspired!',
    timestamp: new Date().getTime() - 8 * 60 * 60 * 1000, // 8 hours ago
    likes: 18,
    likedBy: [],
    comments: [],
  },
  {
    id: 'mock-4',
    author: 'John Smith',
    content:
      'Tip: Use localStorage to persist data in your React apps. It\'s a game-changer for local storage of user preferences and app state!',
    timestamp: new Date().getTime() - 12 * 60 * 60 * 1000, // 12 hours ago
    likes: 35,
    likedBy: [],
    comments: [
      {
        id: 'comment-4',
        author: 'Sarah Johnson',
        text: 'Super helpful tip! Already using this in my project.',
        timestamp: new Date().getTime() - 11.5 * 60 * 60 * 1000,
      },
    ],
  },
];
