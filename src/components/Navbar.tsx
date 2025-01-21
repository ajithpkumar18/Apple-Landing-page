// @ts-ignore
import { appleImg, searchImg, bagImg } from "../utils"
// @ts-ignore
import { navLists } from "../constants"
import { Key } from "react"

const Navbar = () => {
    console.log(navLists)
    return (
        <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">

            <nav className="flex w-full ms-auto me-auto relative max-w-6xl">
                <img src={appleImg} alt="Apple " className="w-7" />

                <div className="flex flex-1 justify-center max-sm:hidden">
                    {navLists.map((nav: String, i: Key) => (
                        <div key={i} className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all ">
                            {nav}
                        </div>
                    ))}
                </div>
                <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
                    <img src={searchImg} alt="search" className="w-8 h-8" />
                    <img src={bagImg} alt="search" className="w-8 h-8" />
                </div>
            </nav>
        </header>
    )
}

export default Navbar