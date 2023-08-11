import './about.css';
import Navigation from '../Navbar/navbar';
import { ScrollControls, Scroll, Environment, Float } from '@react-three/drei';
import { Sphere } from '../../models/Sphere';
import { Bloom, DepthOfField, EffectComposer, Vignette } from '@react-three/postprocessing';
import { React, useEffect, useState, useRef } from 'react';
import { FaBullseye, FaPalette, FaCode, FaCube, FaPaintBrush, FaArrowRight, FaFacebook, FaTwitter, FaDribbble, FaLinkedin } from 'react-icons/fa';
import { TweenLite, Circ, gsap } from 'gsap';

//Images

const About = () => {

  return (
        <>
            <color attach='background' args={['#000000']}/>
            <ambientLight intensity={1}/>
            <spotLight position={[0, 25, 0]} angle={1.3} penumbra={1} castShadow intensity={2} shadow-bias={-0.0001}/>

            <Environment preset='sunset'/>

            <EffectComposer>
                <Bloom intensity={2} luminanceThreshold={0.2} luminanceSmoothing={0.9} height={1000}/>
                <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={5} height={400} />
                <Vignette eskil={false} offset={.1} darkness={1}/>
            </EffectComposer>

            <ScrollControls pages={6} dumping={0.25}>
                <Scroll>
                    <Float
                        speed={1} // Animation speed, defaults to 1
                        rotationIntensity={1} // XYZ rotation intensity, defaults to 1
                        floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
                        floatingRange={[0.5, 0.5]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
                    >
                        
                    </Float>
                </Scroll>
                <Scroll html style={{width: '100%'}}>
                    <>
                        <Navigation/>
                    </>
                    <div className='container about-hero-section'>
                        <h1 className='text-center' style={{padding: "50px 0px 30px 0", color: "#E01265"}}>About</h1>
                        <br/>
                        <div className='container'>
                            <p className='text-center' style={{padding: "0px 0px 50px 0", fontWeight: "500", fontSize: "42px"}}>Empowering Brands with Creative Digital Solutions<br/> for Exceptional Online Presence.</p>
                        </div>
                    </div>
                    <section class="page-section" id="about">
                        <div class="container">
                            <div class="text-center">
                                <h2 class="section-heading text-uppercase" style={{color: "#fff"}}>Plus Agency</h2>
                                <br/>
                                <br/>
                            </div>
                            <ul class="timeline">
                                <li>
                                    <div class="timeline-image"></div>
                                    <div class="timeline-panel">
                                        <div class="timeline-heading">
                                            <h3 class="subheading">Unveiling Our Modest Beginnings</h3>
                                        </div>
                                        <div class="timeline-body">
                                            <p class="text-muted">"2022-2023: Our Humble Beginnings" signifies a pivotal phase in
                                             our agency's journey. During this period, we laid the foundation for our aspirations,
                                              fostering growth, creativity, and innovation. Through dedication and hard work, we 
                                              embarked on a path that led to our establishment as a prominent force in the industry.
                                            This chapter narrates the story of our origins, highlighting the passion and 
                                            commitment that fueled our rise. As we reflect on these formative years, we take pride
                                            in the progress we've made and eagerly anticipate the remarkable chapters yet to
                                             unfold.</p>
                                        </div>
                                    </div>
                                </li>
                                <li class="timeline-inverted">
                                    <div class="timeline-image"></div>
                                    <div class="timeline-panel">
                                        <div class="timeline-heading">
                                            <h3 class="subheading">Why Choose Us?</h3>
                                        </div>
                                        <div class="timeline-body">
                                            <p class="text-muted">
                                                1. <b>Strategic Approach:</b> We don't believe in one-size-fits-all solutions. We tailor our strategies
                                                 to suit your unique needs, ensuring maximum impact and value.
                                            </p>
                                            <p class="text-muted">
                                                2. <b>Innovative Design:</b> Our design team crafts visually appealing and user-centric experiences 
                                                that leave a lasting impression.
                                            </p>
                                            <p class="text-muted">
                                                3. <b>Technical Excellence:</b> Our developers are skilled in the latest technologies, delivering 
                                                scalable and efficient solutions that meet your business goals.
                                            </p>
                                            <p class="text-muted">
                                                4. <b>Data-Driven:</b> We base our decisions on data insights, ensuring that our strategies are effective
                                                 and aligned with your business objectives.
                                            </p>
                                            <p class="text-muted">
                                                5. <b>Passion for Growth:</b> We are not just a service provider; we are your growth partner. We are invested
                                                 in your success and dedicated to helping you achieve your goals.
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="timeline-image"></div>
                                    <div class="timeline-panel">
                                        <div class="timeline-heading">
                                            <h3 class="subheading">Our Mission</h3>
                                        </div>
                                        <div class="timeline-body">
                                            <p class="text-muted">
                                                Our mission is to empower businesses to harness the full potential of the digital realm.
                                                 We are committed to delivering high-quality services that drive growth, engagement, and 
                                                 success. By blending cutting-edge technology with creative strategies, we help our clients
                                                  stand out in a competitive market.
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                    
                                <li class="timeline-inverted">
                                    <div class="timeline-image">
                                
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>
                </Scroll>
            </ScrollControls>
        </>
  );
}

export default About;