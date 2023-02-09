export function Layout({ children }) {
    return (
        <div className="bg-slate-900">
            <header className="h-40 flex items-center justify-center text-white">
                Pokemon Team Builder
            </header>
            {children}
            <footer className="h-40 flex items-center justify-center text-white">
                Pokemon Team Builder
            </footer>
        </div>
    );
}
