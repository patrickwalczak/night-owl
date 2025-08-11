import ReactQueryProvider from './ReactQueryProvider';

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
	return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
