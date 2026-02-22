#  Interactive Social Feed Application

A responsive social media feed application built with React and Vite that demonstrates modern React patterns including component-based architecture, state management with hooks, and browser data persistence. **Now with full image posting support!**

##  Features

### Core Features (Implemented)
- **Display Posts Feed**: View a timeline of posts with author information and timestamps
- **Like/Unlike Functionality**: Toggle like status on posts with instant visual feedback
- **Comments System**: Add and view comments on posts with author information
- **Add New Posts**: Create new posts with author name and content validation
- **📸 Image Posting** (NEW): Upload images with posts, preview before submission, and persistent storage
- **Data Persistence**: All posts, likes, comments, and images persist using localStorage

### Technical Highlights
-  Lightning-fast development with Vite
-  Responsive UI design (mobile-first)
-  Component-based architecture
-  React Hooks for state management (useState, useEffect)
-  localStorage for data persistence
-  FileReader API for image to Base64 conversion
-  Activity stats dashboard
-  Smooth animations and transitions

##  Project Structure

```
src/
├── components/           # Reusable React components
│   ├── AddPost.jsx      # Form for creating new posts + image upload (UPDATED)
│   ├── Feed.jsx         # Main timeline feed
│   ├── Post.jsx         # Individual post component (UPDATED with images)
│   ├── LikeButton.jsx   # Like/unlike button
│   └── CommentBox.jsx   # Comments section
├── styles/              # Component-specific CSS
│   ├── AddPost.css      # Updated with image upload styles
│   ├── Feed.css
│   ├── Post.css         # Updated with image display styles
│   ├── LikeButton.css
│   └── CommentBox.css
├── utils/               # Utility functions
│   ├── storage.js       # localStorage operations
│   └── mockData.js      # Sample data for testing
├── App.jsx              # Main application component
├── App.css              # Main layout styles
├── index.css            # Global styles
└── main.jsx             # React entry point
```

##  Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

The application will be available at `http://localhost:5173/`

## 📝 How to Use

### Creating a Post

1. Fill in your name in the "Your Name" field
2. Share your thoughts in the "What's on your mind?" textarea
3. **(NEW)** Optionally click "Add a Photo" to select an image
   - Supported formats: JPG, PNG, GIF, WebP
   - Maximum file size: 5MB
   - Image preview displays before submission
4. Click the "Post" button to publish

### Adding Images (NEW Feature)

**Image Upload Process**:
```
Select Image → Validate (type & size) → 
Convert to Base64 → Display Preview → 
Remove/Keep → Submit Post → Save with Image Data
```

**Key Points**:
- Click "Add a Photo" to browse your device
- Image preview appears immediately after selection
- You can click the "✕" button to remove the image
- Image is converted to Base64 and stored permanently in localStorage
- Image displays in the post card alongside your content

**Image Specifications**:
- **Formats**: JPG, PNG, GIF, WebP, and all standard image types
- **Max Size**: 5MB (prevents localStorage quota issues)
- **Storage**: Stored as Base64 string in localStorage
- **Persistence**: Image data survives page refresh and browser restart

### Liking Posts
- Click the heart icon (🤍) to like a post
- The icon will turn red (❤️) and the like count will increase
- Click again to unlike

### Adding Comments
1. Click the "💬 Comments" button on any post
2. Enter your name and comment text
3. Click "Post Comment" to add your comment
4. Comments section expands and shows all comments on the post

##  Data Persistence

All data is automatically saved to your browser's localStorage:
- **Posts**: Stored under the key `socialfeed_posts` (includes image data as Base64)
- **Likes**: Stored under the key `userLikedPosts`
- Comments are stored within each post

Data persists across browser sessions and page refreshes.

### Image Data Storage (NEW)

Images are converted to Base64 strings and stored directly within the post object in localStorage:

```javascript
{
  id: "post-id",
  author: "John Doe",
  content: "Check out this photo!",
  image: "data:image/jpeg;base64,/9j/4AAQSkZJRg...", // NEW: Base64 image data
  timestamp: 1708167600000,
  likes: 5,
  comments: []
}
```

**Why Base64?**
-  Stores image data directly in JavaScript objects
-  localStorage can only store text (strings)
-  No external storage or CDN required
-  Images persist with posts automatically
-  Increases file size by ~33% (acceptable for small to medium images)

**To reset data:** Open browser DevTools → Application → LocalStorage → Clear the entries

## 🎨 Image Handling Architecture

### FileReader API Integration

The application uses the HTML5 FileReader API to handle image uploads:

```javascript
const reader = new FileReader();
reader.readAsDataURL(imageFile);  // Convert to Base64
reader.onload = (event) => {
  const base64String = event.target.result;
  setImage(base64String);  // Store in state
};
```

### Image Processing Pipeline

```
File Selection
    ↓
Validation (type & size)
    ↓
FileReader.readAsDataURL()
    ↓
Base64 String Generated
    ↓
Preview Display
    ↓
Submit Post
    ↓
Base64 Data Stored in Post Object
    ↓
Post Saved to localStorage
    ↓
Image Rendered in Post Card
```

### Responsive Image Display

- **Desktop**: Images display at full width (max 500px height)
- **Tablet**: Images scaled appropriately
- **Mobile**: Full-width, optimized for small screens
- **Hover Effect**: Subtle zoom animation on desktop
- **Format**: Images maintain aspect ratio using `object-fit: cover`

## 🎨 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 🖥️ Desktop screens (1024px and up)

### Layout Changes
- **Desktop**: 3-column layout (Form | Feed | Stats)
- **Tablet**: 2-column layout (Form | Feed)
- **Mobile**: Single-column layout (optimized for touch)

## 🔧 Key Technologies

- **React 18**: UI library with Hooks
- **Vite**: Next-generation frontend build tool
- **CSS Grid & Flexbox**: Modern layout techniques
- **localStorage API**: Browser data persistence
- **FileReader API**: Image file to Base64 conversion (NEW)
- **Base64 Encoding**: Store images as text in localStorage (NEW)
- **ES6+ JavaScript**: Modern JavaScript features

## 📦 Available Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build optimized production bundle
npm run preview  # Preview production build locally
npm run lint     # Run ESLint for code quality
```

## 🎯 Component Details

### AddPost Component
- Form validation (required fields, max length checks)
- Character counter for content
- Error messages for validation failures
- Submission handler creates new post object with unique ID and timestamp

### Feed Component
- Displays list of posts in reverse chronological order
- Shows "no posts" message when empty
- Passes essential props to Post components

### Post Component
- Renders author info with avatar badge
- Displays formatted timestamps (e.g., "2h ago")
- Integrates LikeButton and CommentBox
- Shows post content with proper text wrapping

### LikeButton Component
- Toggle like/unlike with visual feedback
- Displays like count
- Color changes on liked state (white heart → red heart)

### CommentBox Component
- Collapsible comments section
- Add comments with author name and text
- Display comments with timestamps
- Form validation

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ Component composition and reusability
- ✅ State management with useState Hook
- ✅ Side effects with useEffect Hook
- ✅ Event handling and form management
- ✅ Conditional rendering and lists
- ✅ localStorage API for persistence
- ✅ FileReader API for file handling (NEW)
- ✅ Base64 encoding/decoding (NEW)
- ✅ Responsive CSS design
- ✅ Component prop passing
- ✅ Form validation
- ✅ Unique key usage for lists

## 📸 Component Updates for Image Support

### AddPost Component (ENHANCED)
- **New State**: `image`, `imagePreview`
- **New Handler**: `handleImageSelect()` - converts image to Base64
- **New Handler**: `handleRemoveImage()` - allows image removal
- **New Validation**: File type and size checks
- **New UI**: File input + Preview container + Remove button
- **Updated Logic**: Image data included in post object

### Post Component (ENHANCED)
- **New JSX**: Conditional image display in post card
- **New Structure**: Image renders between content and actions
- **New Styling**: Image container with responsive sizing
- **Backward Compatible**: Works with old posts without images

### CSS Updates
- **AddPost.css**: Image input styling, preview container, remove button
- **Post.css**: Image display, hover effects, responsive sizing

## 🚀 Future Enhancement Ideas

- **User Authentication**: Add login/signup functionality
- **User Profiles**: Create user profile pages with follower counts
- **Search Functionality**: Search posts by keyword or author
- **Hashtags**: Support hashtags in posts
- **Notifications**: Real-time notifications for interactions
- **Dark Mode**: Toggle between light and dark themes
- **Emoji Picker**: Easy emoji insertion in posts
- **Image Upload**: Support for image attachments in posts
- **Pagination**: Load posts incrementally
- **Backend Integration**: Connect to a real API server



