# Mini-Game Web Portal

Welcome to the **Mini-Game Web Portal**, a React-based web application featuring a collection of 5 engaging mini-games. This project is designed to showcase interactive UI, React state management, player profiles, leaderboards, and animated game feedback.

---

## Features

- **Five Mini-Games**:
  - Memory Game: Match pairs with move tracking and completion animation.
  - Quiz Game: Multiple-choice questions with immediate feedback and scoring.
  - Tic-Tac-Toe: Play against a random AI opponent.
  - Hangman: Classic word guessing with limited wrong attempts.
  - 15 Puzzle: Classic sliding tiles puzzle with moves and timer tracking.

- **Player Profile System**: Enter your name to personalize gameplay and leaderboard entries.

- **Persistent Leaderboards**: Local storage based leaderboards per game tracking high scores, best moves, or fastest times.

- **Reset & Back Buttons**: Consistent controls to restart or exit games seamlessly.

- **Completion Modals**: Animated popups with congratulatory 3-star animations upon winning.

- **Responsive Design**: Works on desktops, tablets, and mobile devices.

---

## Demo

Access the live demo here:  
[https://b000ster.github.io/mini-game-web-portal/](https://b000ster.github.io/mini-game-web-portal/)

---

## Screenshots

_(Include some screenshots or GIFs demonstrating each game UI and leaderboard if you want.)_

---

## Installation & Running Locally

1. **Clone the repository**

git clone https://github.com/b000ster/mini-game-web-portal.git
cd mini-game-web-portal

2. **Install dependencies**

Make sure you have Node.js (v14+) and npm installed.


3. **Run the development server**


The app should open automatically at [http://localhost:3000](http://localhost:3000).

4. **Build for production**


This creates an optimized build in the `build` folder.

---

## Deployment to GitHub Pages

To deploy to GitHub Pages, ensure your `package.json` includes the correct `homepage` field and deploy scripts:
"homepage": "https://b000ster.github.io/mini-game-web-portal/",
"scripts": {
"predeploy": "npm run build",
"deploy": "gh-pages -d build",
// ...other scripts
}

Install `gh-pages` if not done yet:


Deploy with:


For detailed guidance, see the [Create React App deployment docs](https://facebook.github.io/create-react-app/docs/deployment).

---

## Technologies Used

- [React](https://reactjs.org/) (v18+)
- React Context API for state management
- localStorage for data persistence
- CSS for responsive and animated UI
- GitHub Pages for deployment

---

## Folder Structure

mini-game-web-portal/
├── public/
│ ├── assets and images
├── src/
│ ├── components/ # Shared UI components
│ ├── games/ # Individual mini-game components
│ ├── PlayerContext.js # Player name context provider
│ ├── App.js # Root component
│ └── index.js # React entry point
├── package.json
└── README.md

text

---

## Contribution

Contributions are welcome! If you find any issues or want to add new games or features, please open an issue or submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

Created by Vemula Sai Vikas – feel free to contact me!

- GitHub: [b000ster](https://github.com/b000ster)
- Email: saivikas.vemula67@gmail.com

---

Happy gaming! 🎮
If you want, I can also help you prepare a shorter README version, or add badges, or customize the sections further for your portfolio or GitHub profile. Just ask!

