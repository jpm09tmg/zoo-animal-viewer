import './globals.css';
import Providers from './components/Providers';

export const metadata = {
  title: 'Zoo Animal Viewer',
  description: 'View and manage zoo animals',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}