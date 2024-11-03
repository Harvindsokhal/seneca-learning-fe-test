# Seneca Learning - Front-End Test

The task is to make a component using React. The component is intended to test the user's knowledge of a topic, by having them move a series of toggles into the correct positions

## Installation

1. **Clone the repository:**

```bash
git clone git@github.com:Harvindsokhal/seneca-learning-fe-test.git
```

2. **Install dependencies:**

```bash
npm install || yarn install
```

3. **Run the development server:**

```bash
npm start || yarn start
```

## Technology Stack

- **React & TypeScript**: Provides structure and type safety for the application, enhancing maintainability and scalability.

- **Framer Motion**: Manages animations for smooth toggle transitions and background color changes, creating an engaging user experience.

- **SCSS**: Used for styling, following the Figma design as closely as possible for accurate visual representation. SCSS allows for modular, reusable, and responsive styling.

- **React Query**: Manages data fetching and caching, simulating API calls for a smoother and more realistic data-handling experience.

## Project Structure

### components/

Contains the main **Quiz** component and its sub-components, including **AnswersToggle** and **AnswerToggleButton**.

### models/

Defines **TypeScript interfaces** for questions and answer options, allowing for strict typing across the app.

### services/

Contains the **fetchQuestions** function, which simulates fetching quiz questions from an API endpoint.

### utils/

Holds **helper functions** for gradient interpolation and array manipulation, aiding in reusable logic across components.

### App.tsx

The main app component responsible for rendering the quiz interface.

## Assumptions and Limitations

1. Data Mocking
   This implementation simulates API calls for questions via the **fetchQuestions** function. In a production setup, a real API endpoint would be integrated to fetch live data.

2. Gradient Levels
   Background color transitions dynamically based on the percentage of correct answers. This uses a custom **interpolateGradient** function to achieve a smooth color gradient effect.

3. Randomized Question Positioning
   Questions may randomly appear in a pre-correct order; this behavior is currently allowed by the app logic and can be adjusted as needed. - Fixed

4. Answer Toggle Wrapping
   Answer toggles will wrap to a new line only if a word length exceeds the preset limit of 25 characters, ensuring readability on various screen sizes. - Fixed

## Future Enhancements

- **Dynamic Data Fetching**: Integrate with a live API to enable real-time question loading and improve scalability.

- **Extended Question Format Support**: Expand support for more complex question types, allowing additional answer choices to accommodate diverse formats.

- **Improved Mobile Scaling**: Replace the current hardcoded length limitation with a dynamic comparison between text length and button width, scaling down text if overlap is detected for a more adaptive design. - Fixed

- **State Management Optimization**: For larger codebases with multiple states, implement a state management library like Redux to streamline and optimize state handling.

- **Enhanced Test Coverage**: Add comprehensive test coverage for the application
