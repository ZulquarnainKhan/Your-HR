import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Button = ({ label }) => {
    return (
        <Link to="/uploadResume" className='flex items-center btn_container'>
            <button className='flex justify-center items-center gap-2 px-4 py-4 font-montserrat text-lg leading-none btn'>
                {label}
            </button>
            <FiArrowUpRight className='btn_side1 btn_side ' />
        </Link>
    );
};

export default Button;
