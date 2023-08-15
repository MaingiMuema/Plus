import './joinus.css';
import React from 'react';
import { ScrollControls, Scroll, Environment, Float } from '@react-three/drei';
import { FaBullseye, FaPalette, FaCode, FaCube, FaPaintBrush, FaArrowRight, FaFacebook, FaTwitter, FaDribbble, FaLinkedin, FaPhone, FaEnvelopeOpenText, FaMapMarkedAlt } from 'react-icons/fa';
import Navigation from '../Navbar/navbar';

//images
import Vector1 from '../../Assets/Creative team.gif';
import Img1 from '../../Assets/about-hero-img.png';

const Joinus = () =>{

    return(
        <>
            <ScrollControls pages={6} dumping={0.25}>
                <Scroll Scroll html style={{width: '100%'}}>
                    <>
                        <Navigation/>
                    </>
                    <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-lg-7' style={{padding: "80px 50px"}}>
                                    <h1 className='hero-header'>Join our Team <br/> of Disruptors</h1>
                                    <br/>
                                    <br/>
                                    <button className="hero-call-to-action">
                                        <span>View Open Roles</span>
                                        <FaArrowRight style={{ marginLeft: '5px' }} />
                                    </button>
                                </div>
                                <div className='col-lg-5 hero-left-container d-flex justify-content-center'>
                                    <img src={Vector1} className='img-fluid' alt="team"/>
                                </div>
                            </div>
                            <div className='container' style={{padding: "200px 20px 200px 20px"}}>
                                <div className='row'>
                                    <div className='col-lg-4 join-us-heading d-flex justify-content-center'>
                                        <h2>Show up, make the best work of your career, and live the life you want.</h2>
                                    </div>
                                    <div className='col-lg-8 join-us-description'>
                                        <p>
                                        Embracing Flexibility and Sustainability Right from the start, our mission at Plus
                                         has been to create a thriving community. Our focus? Blending personal and collective
                                          growth by prioritizing flexibility and sustainability. We champion a lifestyle 
                                        that lets us choose where we live and work, maintain balanced hours, and enjoy well-deserved 
                                        breaks. Our commitment to inclusivity and warmth is deeply ingrained in everything we do, 
                                        setting Plus apart as a truly exceptional choice.
                                        <br/>
                                        <br/>
                                        Nurturing Excellence Every Step of the Way At Plus, we're dedicated to propelling your
                                        professional journey forward. Our ethos revolves around fostering mentorship across all 
                                        fields, with a relentless commitment to unlocking every team member's utmost capabilities.
                                         Experience your career's finest moments as you thrive with us.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='container d-flex justify-content-center'>
                                    {/* Change img to video*/}
                                    <img className='img-fluid' src={Img1} style={{borderRadius: "20px"}}/>
                                </div>
                            </div>
                            <div className='row job-section'>
                                <div className='container'>
                                    <h1 className='text-center' style={{fontSize: "42px", fontWeight: "700"}}>Find your next Job</h1>
                                    <br/>
                                    <hr/>
                                    <br/>
                                    <div className='collapse-btns'>
                                        <button className='collapse-btn'>All</button>
                                        <button className='collapse-btn'>UI/UX</button>
                                        <button className='collapse-btn'>Animation</button>
                                        <button className='collapse-btn'>operations</button>
                                        <button className='collapse-btn'>Graphic Design</button>
                                        <button className='collapse-btn'>Software Development</button>
                                        <button className='collapse-btn'>Social media management</button>
                                    </div>
                                    <div className='jobs-container'>
                                        <div className='job-container' id="job1">
                                            <div className='card'>
                                                <div className='row'>
                                                    <div className='col-lg-9'>
                                                        <h3 className='text-align-center'>UI/UX Engineer </h3>
                                                        <p><b>Company:</b> Bitskill</p>
                                                    </div>
                                                    <div className='col-lg-3'>
                                                        <p>KENYA</p>
                                                        <p style={{fontSize: "14px"}}>Permanent</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='job-container' id="job2">
                                            <div className='card'>
                                                <div className='row'>
                                                    <div className='col-lg-9'>
                                                        <h3 className='text-align-center'>UI/UX Engineer </h3>
                                                        <p><b>Company:</b> Dobiri</p>
                                                    </div>
                                                    <div className='col-lg-3'>
                                                        <p>KENYA(FREELANCE)</p>
                                                        <p style={{fontSize: "14px"}}>contract</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='job-container' id="job3">
                                            <div className='card'>
                                                <div className='row'>
                                                    <div className='col-lg-9'>
                                                        <h3 className='text-align-center'>Web Developer</h3>
                                                        <p><b>Company:</b> Bitskill</p>
                                                    </div>
                                                    <div className='col-lg-3'>
                                                        <p>KENYA</p>
                                                        <p style={{fontSize: "14px"}}>Permanent</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='job-container' id="job4">
                                            <div className='card'>
                                                <div className='row'>
                                                    <div className='col-lg-9'>
                                                        <h3 className='text-align-center'>Mobile Developer</h3>
                                                        <p><b>Company:</b> Bitskill</p>
                                                    </div>
                                                    <div className='col-lg-3'>
                                                        <p>KENYA(FREELANCE)</p>
                                                        <p style={{fontSize: "14px"}}>contract</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='job-container' id="job5">
                                            <div className='card'>
                                                <div className='row'>
                                                    <div className='col-lg-9'>
                                                        <h3 className='text-align-center'>Scrum Master</h3>
                                                        <p><b>Company:</b> Plus</p>
                                                    </div>
                                                    <div className='col-lg-3'>
                                                        <p>KENYA</p>
                                                        <p style={{fontSize: "14px"}}>Permanent</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </Scroll>
            </ScrollControls>  
        </>
    );
}

export default Joinus;