# ClawLegaltech
# Resignation Management System

A modern web application built with React and TypeScript for managing employee resignations and exit interviews efficiently.

![Resignation Management System](https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000)

## Features

### For Employees
- **Account Management**
  - User registration and login
  - Secure authentication system
  - Role-based access control

- **Resignation Submission**
  - Submit resignation requests
  - Specify last working day
  - Track resignation status

- **Exit Interview**
  - Complete exit questionnaire
  - Provide feedback about work experience
  - Submit responses securely

### For HR Administrators
- **Resignation Management**
  - View all resignation requests
  - Approve or reject resignations
  - Manage last working day dates

- **Exit Interview Analysis**
  - Access all exit questionnaire responses
  - Review employee feedback
  - Track resignation trends

## Technology Stack

- **Frontend**
  - React 18
  - TypeScript
  - Tailwind CSS
  - React Router v6
  - Axios for API calls
  - React Hot Toast for notifications
  - Lucide React for icons

- **Development Tools**
  - Vite
  - ESLint
  - PostCSS
  - Autoprefixer

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd resignation-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Usage

### Employee Access
1. Register a new account with your desired username and password
2. Log in to your account
3. Submit resignation request with your planned last working day
4. Complete the exit questionnaire when prompted

### HR Administrator Access
1. Log in with admin credentials:
   - Username: `admin`
   - Password: `admin`
2. Access the HR dashboard to:
   - View all resignation requests
   - Approve or reject resignations
   - Review exit questionnaire responses

## Project Structure

```
src/
├── api/          # API integration and axios configuration
├── components/   # Reusable React components
├── context/      # React context for state management
├── pages/        # Page components and routes
│   ├── dashboard/    # Dashboard views
│   ├── Login.tsx    # Login page
│   └── Register.tsx # Registration page
├── types/        # TypeScript type definitions
├── App.tsx       # Main application component
└── main.tsx      # Application entry point
```

## API Integration

The frontend communicates with a backend server running on `http://localhost:8080/api`. The API endpoints include:

### Authentication
- POST `/auth/login` - User login
- POST `/auth/register` - User registration

### Employee Endpoints
- POST `/user/resign` - Submit resignation
- POST `/user/responses` - Submit exit questionnaire

### HR Admin Endpoints
- GET `/admin/resignations` - Get all resignations
- PUT `/admin/conclude_resignation` - Process resignation
- GET `/admin/exit_responses` - Get all exit responses

## Security Features

- JWT-based authentication
- Protected routes for authenticated users
- Role-based access control
- Secure password handling
- HTTP-only cookies for token storage

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=http://localhost:8080/api
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
