import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { AgreeModal } from './components/AgreeModal';
import Providers from './utils/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Sidekick Decide',
	description: 'Activity Voting App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={inter.className}>
					<Providers>
						<Toaster />
						<Header />
						<AgreeModal />
						{children}
					</Providers>
				</body>
			</html>
		</ClerkProvider>
	);
}
