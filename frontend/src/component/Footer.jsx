import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    <img
                        className='mb-5 w-32'
                        src={assets.logo}
                        alt="Brand Logo"
                    />
                    <p className='w-full md:w-2/3 text-gray-600'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>

                <div>
                    <p className='footer-heading'>COMPANY</p>
                    <ul className='footer-ul'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <p className="footer-heading">GET IN TOUCH</p>
                    <ul className="footer-ul">
                        <li>+44 020 8892 0041</li>
                        <li>contact@foreveryou.com</li>
                    </ul>
                </div>

            </div>
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>
                    Copyright 2024@ forever.com - All Right Reserved.
                </p>
            </div>
        </div>
    )
}

export default Footer