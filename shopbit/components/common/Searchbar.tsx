import { FC, memo, useEffect } from 'react'
import cn from 'clsx'
import { useRouter } from 'next/router'



const SearchBar = () => {
    const router = useRouter()

    useEffect(() => {
        router.prefetch('/search')
    }, [router])

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault()

        if (e.key === 'Enter') {
            const q = e.currentTarget.value

            router.push(
                {
                    pathname: `/search`,
                    query: q ? { q } : {},
                },
                undefined,
                { shallow: true }
            )
        }
    }

    return (
        <div className=" relative text-sm bg-accent-0 text-base w-full transition-colors duration-150 border border-accent-2 rounded-full">
            <label className="hidden" >
                Search
            </label>
            <input
                className="bg-transparent px-3 py-2  w-full rounded-full pr-10"
                placeholder="Search for products..."
                defaultValue={router.query.q}
                onKeyUp={handleKeyUp}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    />
                </svg>
            </div>
        </div>
    )
}

export default SearchBar;