import React from 'react';
import Link from 'next/link';

const HomeHeader = () => {
    return (
        <header className='bg-black'>
            <div className='flex justify-between px-20 py-10 text-white'>
                <span>
                    <Link href='/'>Artigos</Link>
                </span>
                <nav>
                    <ul>
                        <li>
                            <Link href='/Login'>Login</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default HomeHeader;