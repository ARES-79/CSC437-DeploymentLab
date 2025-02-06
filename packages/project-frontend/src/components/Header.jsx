import './Header.css'

function Header() {
    return (
        // fixed top-0 left-0 z-50
        <header className='w-full bg-white shadow-md pb-2 flex justify-center items-center'> 
            <div className='inline-flex flex-col items-center mx-auto'>
                <h1 className='text-indigo-800 tracking-wide text-center' id="brand-logo">BurritoGram</h1>
                <nav className='flex justify-evenly w-full mt-1'>
                    {/* switch to be links later */}
                    <p className="relative px-4 after:content-['|'] after:absolute after:-right-2 after:text-gray-400 last:after:content-none">
                        Home</p>
                    <p className="relative px-4 after:content-['|'] after:absolute after:-right-2 after:text-gray-400 last:after:content-none">
                        Post</p>
                    <p className="relative px-4">Profile</p>
                </nav>
            </div>
        </header>
    );
}

export default Header;