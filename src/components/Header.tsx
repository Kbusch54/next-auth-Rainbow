import React from 'react'
import CustomButton from './CustomButton'

interface Props {
    
}

const Header: React.FC<Props> = () => {
    return (
        <div className='grid grid-cols-4 gap-x-4 md:gap-x-12 mx-6'>
            <div className='col-span-3 hidden md:flex flex-row justify-between  '>
                <p>Home</p>
                <a href='/clientProtected'>Client Protected</a>
                <p>Navigation</p>
                <p>Bye</p>
            </div>
            <div className='flex md:hidden bg-red-500 col-span-3'>
                hamburgler
            </div>
            <div className='col-span-1 flex  justify-end '>
                <CustomButton/>
            </div>
        </div>
    )
}

export default Header
