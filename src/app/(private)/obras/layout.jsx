import HeaderObras from './(components)/header-obras';

export default function Layout({ children }) {
    return (
        <>
            <HeaderObras />
            {children}
        </>
        
    )
}