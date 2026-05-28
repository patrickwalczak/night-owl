import ReactQueryProvider from '../../../src/app/providers/ReactQueryProvider';

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
    return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
