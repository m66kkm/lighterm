

# TypeScript (React)

# TypeScript React Development Guidelines

## Introduction
This document outlines the best practices and guidelines for developing React applications using TypeScript. It covers coding standards, folder structure, performance optimization, and additional instructions to ensure high-quality and maintainable code.

## Coding Standards
- **Functional Components**: Prefer functional components over class components.
- **TypeScript Best Practices**:
  - Use `React.FC` for functional components with props.
  - Utilize `useState` and `useEffect` hooks for state and side effects.
  - Implement proper TypeScript interfaces for props and state.
  - Use `React.memo` for performance optimization when needed.
  - Implement custom hooks for reusable logic.
  - Utilize TypeScript's strict mode.

## Folder Structure
```
src/
  components/
  hooks/
  pages/
  types/
  utils/
  App.tsx
  index.tsx
```

## Performance Optimization
- **React.memo**: Use `React.memo` for pure function components.
- **Lazy Loading**: Implement lazy loading of routing components using `React.lazy` and `Suspense`.
- **useEffect**: Optimize `useEffect` dependencies to prevent unnecessary re-renders.

## Testing Requirements
- **Unit Tests**: Write unit tests using Jest and React Testing Library.
- **Test Coverage**: Ensure test coverage reaches at least 80%.
- **Snapshot Testing**: Use snapshot testing for UI components.

## Documentation
- **JSDoc**: Write comments for functions and components in JSDoc format.
- **PropTypes**: Components must include PropTypes validation.
- **README.md**: Each main directory must contain a README.md file.
- **Language Support**: Provide both English and Chinese versions of the README.md file.

## Error Handling
- **try/catch**: Use `try/catch` blocks to handle asynchronous operations.
- **Error Boundaries**: Implement global error boundary components.

## Additional Instructions
1. Use `.tsx` extension for files with JSX.
2. Implement strict TypeScript checks.
3. Utilize `React.lazy` and `Suspense` for code-splitting.
4. Use type inference where possible.
5. Implement error boundaries for robust error handling.
6. Follow React and TypeScript best practices and naming conventions.
7. Use ESLint with TypeScript and React plugins for code quality.

