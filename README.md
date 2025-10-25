# Sudoku

A clean, minimal, and ad-free Sudoku game built with Next.js 15 and TypeScript.

## Features

- 🎮 **4 Difficulty Levels**: Easy, Medium, Hard, and Expert
- 🎨 **Light & Dark Themes**: Beautiful color schemes for both modes
- ⌨️ **Full Keyboard Support**: Play entirely with your keyboard
- 📝 **Notes Mode**: Add pencil marks to help solve puzzles
- 💡 **Hint System**: Get help when you're stuck
- ↩️ **Undo/Redo**: Unlimited undo and redo functionality
- ⏱️ **Timer**: Track how long it takes to solve each puzzle
- ⏸️ **Pause**: Pause the game anytime
- ✅ **Conflict Detection**: Automatically highlights invalid moves
- 🎯 **Cell Highlighting**: Highlights related cells, rows, columns, and boxes
- 🚫 **No Ads**: Clean, distraction-free experience

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sudoku
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Play

### Keyboard Controls

- **Arrow Keys**: Navigate between cells
- **1-9**: Enter a number in the selected cell
- **Delete/Backspace**: Clear the selected cell
- **N**: Toggle notes mode
- **H**: Get a hint for the selected cell
- **Ctrl+Z**: Undo
- **Ctrl+Y**: Redo
- **Space**: Pause/Resume

### Mouse Controls

- Click any cell to select it
- Click number pad buttons to enter numbers
- Use control buttons for undo, redo, hints, etc.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx           # Main game page
├── components/
│   └── sudoku/            # Sudoku game components
│       ├── Board.tsx      # Game board grid
│       ├── Cell.tsx       # Individual cell component
│       ├── Controls.tsx   # Control buttons
│       ├── NumberPad.tsx  # Number input pad
│       └── Timer.tsx      # Game timer
├── hooks/
│   ├── useSudoku.ts       # Main game logic hook
│   └── useTheme.ts        # Theme management hook
└── lib/
    └── sudoku/            # Sudoku logic
        ├── generator.ts   # Puzzle generation
        ├── solver.ts      # Puzzle solving algorithms
        ├── validator.ts   # Move validation
        └── types.ts       # TypeScript types
```

## Features in Detail

### Puzzle Generation
- Generates valid, solvable puzzles using backtracking algorithm
- Ensures unique solutions for Hard and Expert difficulties
- Validates puzzle quality before presenting to player

### Theme System
- Automatic dark mode detection
- Manual theme toggle
- Persistent theme preference in localStorage
- Custom CSS variables for easy theming

### Game State Management
- Complete undo/redo history
- Board state persistence
- Conflict detection in real-time
- Completion detection

## Building for Production

```bash
npm run build
npm start
```

## Deployment

This app can be deployed to any platform that supports Next.js:

- **Vercel**: One-click deployment
- **Netlify**: Connect your Git repository
- **Docker**: Use the included Dockerfile (if available)

## License

MIT

## Author

Built with ❤️ by Sarthak Sharma
