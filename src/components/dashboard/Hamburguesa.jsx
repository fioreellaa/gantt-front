import MenuIcon from '@mui/icons-material/Menu';
import DashOptions from './WorkbookDash';
import { useState, useEffect, useCallback } from "react";

function Hamburguesa({options, setOptions}) {

    const [isOpen, setIsOpen] = useState(false);
    

    
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    

  
    return (
        <div className="relativa">
            <MenuIcon className='cursor-pointer' onClick={toggleMenu}></MenuIcon>
            <div className={`fixed top-0 left-0 h-full w-64 bg-blue shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 bg-white z-50`}>
                <div className='flex justify-between items-center px-2 mx-2"'>
                    <MenuIcon className='ml-2' onClick={toggleMenu}></MenuIcon>

                    <div className='text-2xl font-bold'>
                        Workbook
                    </div>
                    <div className='flex justify-end p2 m-2'>
                        <button onClick={toggleMenu} className='text-lg'>x</button>
                    </div>
                </div>
                <div>
                    <DashOptions options= {options} setOptions={setOptions}></DashOptions>
                </div>

            </div>
        </div>
    );

}

export default Hamburguesa;