## Prerequisites

- Node.js (version 20.14.0 or higher)
- PNPM (version 8.6.2 or higher)
- npm (version 10.7.0 or higher) (backup)
- Git (optional, for version control)

## Basic Setup

1. Clone repository (if using existing project):

```bash
git clone https://github.com/username/project-name.git
cd project-name
```

2. Install dependencies:

```bash
pnpm install
```

## Running the Application

1. Development mode:

```bash
pnpm run dev
```

- Access the application at http://127.0.0.1:3000/

2. Production build:

```bash
pnpm run build
```

## Required Dependencies

The following packages are required for the application:

### Core Dependencies

- react: ^18.3.1
- react-chartjs-2: ^5.2.0
- react-router-dom: ^6.27.0
- axios: ^1.7.7
- react-redux: ^9.1.2
- chart.js: ^4.4.5
- @headlessui/react: ^2.1.10
