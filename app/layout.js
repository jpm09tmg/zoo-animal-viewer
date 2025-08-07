import './globals.css';
import { AuthProvider } from './hooks/useAuth';

export const metadata = {
  title: 'Zoo Animal Viewer',
  description: 'View and manage zoo animals',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}