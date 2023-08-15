import './joinus.css';
import React from 'react';
import Navigation from '../Navbar/navbar';
import { ScrollControls, Scroll, Environment, Float } from '@react-three/drei';
import { FaBullseye, FaPalette, FaCode, FaCube, FaPaintBrush, FaArrowRight, FaFacebook, FaTwitter, FaDribbble, FaLinkedin, FaPhone, FaEnvelopeOpenText, FaMapMarkedAlt } from 'react-icons/fa';

const BuildTogether = () =>{

    return(
        <>
            <ScrollControls pages={6} dumping={0.25}>
                <Scroll Scroll html style={{width: '100%'}}>
                    <div className='container-fluid'>
                        <div className='container'>
                            <h1>Join our Team of Disruptors</h1>
                            <button className="hero-call-to-action">
                                <span>View Open Roles</span>
                                <FaArrowRight style={{ marginLeft: '5px' }} />
                            </button>
                        </div>
                    </div>
                </Scroll>
            </ScrollControls>  
        </>
    );
}

export default BuildTogether;