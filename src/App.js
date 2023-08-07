import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from './Components/Navbar/navbar';
import { ScrollControls, Scroll, Environment, Float } from '@react-three/drei';
import { Cosmos } from './models/Cosmos';
import { Sphere } from './models/Sphere';
import { Bloom, DepthOfField, EffectComposer, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { React, useEffect, useState, useRef } from 'react';
import SecondAnime from './models/SecondAnime';
import { FaBullseye, FaPalette, FaCode, FaCube, FaPaintBrush, FaArrowRight, FaFacebook, FaTwitter, FaDribbble, FaLinkedin } from 'react-icons/fa';
import { TweenLite, Circ, gsap } from 'gsap';

//Images
import Image1 from "./Assets/img1.png";

function App() {

  let width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

  useEffect(() => {
    // This runs after the DOM has loaded
    initHeader();
    initAnimation();
    addListeners();

    // Cleanup function for removing event listeners on unmount
    return () => {
      removeListeners();
    };
  }, []);

  function initHeader() {
    width = window.innerWidth;
    height = window.innerHeight;
    target = { x: width / 2, y: height / 2 };

    largeHeader = document.getElementById('large-header');
    largeHeader.style.height = height + 'px';

    canvas = document.getElementById('demo-canvas');
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');

    // create points
    points = [];
    for (let x = 0; x < width; x = x + width / 20) {
      for (let y = 0; y < height; y = y + height / 20) {
        const px = x + Math.random() * width / 20;
        const py = y + Math.random() * height / 20;
        const p = { x: px, originX: px, y: py, originY: py };
        points.push(p);
      }
    }

    // for each point find the 5 closest points
    for (let i = 0; i < points.length; i++) {
      const closest = [];
      const p1 = points[i];
      for (let j = 0; j < points.length; j++) {
        const p2 = points[j];
        if (!(p1 === p2)) {
          let placed = false;
          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (closest[k] === undefined) {
                closest[k] = p2;
                placed = true;
              }
            }
          }

          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
        }
      }
      p1.closest = closest;
    }

    // assign a circle to each point
    for (let i in points) {
      const c = new Circle(points[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
      points[i].circle = c;
    }
  }

  function addListeners() {
    if (!('ontouchstart' in window)) {
      window.addEventListener('mousemove', mouseMove);
    }
    window.addEventListener('scroll', scrollCheck);
    window.addEventListener('resize', resize);
  }

  function removeListeners() {
    if (!('ontouchstart' in window)) {
      window.removeEventListener('mousemove', mouseMove);
    }
    window.removeEventListener('scroll', scrollCheck);
    window.removeEventListener('resize', resize);
  }

  function mouseMove(e) {
    let posx = 0;
    let posy = 0;
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    target.x = posx;
    target.y = posy;
  }

  function scrollCheck() {
    if (document.body.scrollTop > height) animateHeader = false;
    else animateHeader = true;
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    largeHeader.style.height = height + 'px';
    canvas.width = width;
    canvas.height = height;
  }

  function initAnimation() {
    animate();
    for (let i in points) {
      shiftPoint(points[i]);
    }
  }

  function animate() {
    if (animateHeader) {
      ctx.clearRect(0, 0, width, height);
      for (let i in points) {
        if (Math.abs(getDistance(target, points[i])) < 4000) {
          points[i].active = 0.3;
          points[i].circle.active = 0.6;
        } else if (Math.abs(getDistance(target, points[i])) < 20000) {
          points[i].active = 0.1;
          points[i].circle.active = 0.3;
        } else if (Math.abs(getDistance(target, points[i])) < 40000) {
          points[i].active = 0.02;
          points[i].circle.active = 0.1;
        } else {
          points[i].active = 0;
          points[i].circle.active = 0;
        }

        drawLines(points[i]);
        points[i].circle.draw();
      }
    }
    requestAnimationFrame(animate);
  }

  function shiftPoint(p) {
    gsap.to(p, 1 + 1 * Math.random(), {
      x: p.originX - 50 + Math.random() * 100,
      y: p.originY - 50 + Math.random() * 100,
      ease: 'circ.easeInOut',
      onComplete: function () {
        shiftPoint(p);
      }
    });
  }

  function drawLines(p) {
    if (!p.active) return;
    for (let i in p.closest) {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.closest[i].x, p.closest[i].y);
      ctx.strokeStyle = 'rgba(156,217,249,' + p.active + ')';
      ctx.stroke();
    }
  }

  function Circle(pos, rad, color) {
    const _this = this;

    // constructor
    (function () {
      _this.pos = pos || null;
      _this.radius = rad || null;
      _this.color = color || null;
    })();

    this.draw = function () {
      if (!_this.active) return;
      ctx.beginPath();
      ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'rgba(156,217,249,' + _this.active + ')';
      ctx.fill();
    };
  }

  function getDistance(p1, p2) {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
  }
  
  return (
    <>
      <color attach='background' args={['#000000']}/>
      <ambientLight intensity={1}/>
      <spotLight position={[0, 25, 0]} angle={1.3} penumbra={1} castShadow intensity={2} shadow-bias={-0.0001}/>

      <Environment preset='night'/>

      <EffectComposer>
        <Bloom intensity={2} luminanceThreshold={0.2} luminanceSmoothing={0.9} height={1000}/>
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={5} height={400} />
        <Vignette eskil={false} offset={.1} darkness={1}/>
      </EffectComposer>

      <ScrollControls pages={6} dumping={0.25}>

        <Scroll>
          <Float
            speed={1} // Animation speed, defaults to 1
            rotationIntensity={2} // XYZ rotation intensity, defaults to 1
            floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
            floatingRange={[1, 1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
          >
            <Sphere scale={2} position={[0,-.5,0]} />
          </Float>

          <Float
            speed={2} // Animation speed, defaults to 1
            rotationIntensity={2} // XYZ rotation intensity, defaults to 1
            floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
            floatingRange={[1, 1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
          >
            <Sphere scale={0.2} position={[-3,-25.5,6]} />
          </Float>
        </Scroll>

        <Scroll html style={{width: '100%'}}>
        <>
          <Navigation/>
        </>
          <div className="container hero-section" style={{width: '100vw', paddingTop: "120px", paddingBottom: "120px"}}>
            <div className="hero-section-content">
              <div className='d-flex justify-content-center text-center'>
                <h1 className="text-center" style={{marginTop: '4%', fontSize: "56px"}}> We are a<br/>Creative Digital Agency</h1>
              </div>
              <div className='d-flex justify-content-center' style={{marginTop: '70px'}}>
                <button className="hero-call-to-action">
                  <span>Build something Together</span>
                  <FaArrowRight style={{ marginLeft: '5px' }} />
                </button>
                <button className="hero-call-to-action" style={{ marginLeft: '30px' }}>
                  <span>Join Us</span>
                  <FaArrowRight style={{ marginLeft: '5px' }} />
                </button>
              </div>
            </div>
          </div>
          <div className="row" style={{width: '100vw',paddingLeft: "50px", paddingRight: "50px", paddingTop: "220px", paddingBottom: "220px"}}>
            <div className='row'>
              <div className="col-lg-6">
                <h1 className="align-middle" style={{marginTop: '15%'}}>We are specialized in strategised Digital marketing, Design and Web development.</h1>
              </div>
              <div className='col-lg-6 d-flex justify-content-center'>
                  <div className='img1-container'>
                    <img src={Image1} className="img-fluid img1"/>
                  </div>
              </div> 
            </div>
          </div>
          <div className="container" style={{paddingTop: "120px", paddingBottom: "120px"}}>
            <div className='row'>
            <h1 className="text-center"  style={{marginTop: '-5%', color: "#fff", fontWeight: "600", fontSize: "48px"}}>What We Offer</h1>
            <br/>
            <br/>
              <div className='col-lg-6' style={{paddingTop: "20px"}}>
                <div className='service-container'>
                  <div className='service-img'>

                  </div>
                  <div className='service-Description'>

                  </div>
                </div>
              </div>
              <div className='col-lg-6'>
                <div className="services-list" style={{paddingLeft: "30px", paddingRight: "30px", marginTop: "20px"}}>
                  <ul>
                    <a href='#'><li style={{paddingTop: '20px'}}><FaBullseye /> &nbsp; Digital Marketing</li></a>
                    <a href='#'><li style={{paddingTop: '20px'}}><FaPalette /> &nbsp; Web Design</li></a>
                    <a href='#'><li style={{paddingTop: '20px'}}><FaCode /> &nbsp; Development</li></a>
                    <a href='#'><li style={{paddingTop: '20px'}}><FaCube /> &nbsp; Product Design</li></a>
                    <a href='#'><li style={{paddingTop: '20px'}}><FaPaintBrush /> &nbsp; Illustration</li></a>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className='row d-flex justify-content-center value-section' style={{width: "100vw"}}>
            <div className='d-flex justify-content-center'>
              <div className='pitch' style={{width: "60%"}}>
                <h1 className='text-center' style={{color: "#E01265", fontWeight: "600", fontSize: "48px"}}>Our Values</h1>
                <br/>
                <p className='text-center' style={{fontSize: "26px"}}>
                  Plus agency provides digital marketing solutions based on these three<br/> pillars passion, integrity, Data-driven.
                </p>
              </div>
            </div>
            <div className='row d-flex justify-content-center' style={{padding: "70px 70px 20px 70px", width: "100%"}}>
              <div className='col-lg-4 value-col'>
                  <h3 className='text-center' style={{color: "#E01265", fontWeight: "600"}}>Intergrity</h3>
                  <p className='text-center'>
                  we offer an effective approach to your online presence and brand. 
                  we take it as our own, that’s why we are deliberately in delivering
                  what we promise to offer.
                  </p>
              </div>
              <div className='col-lg-4 value-col'>
                  <h3 className='text-center' style={{color: "#E01265", fontWeight: "600"}}>Data-driven</h3>
                  <p className='text-center'>
                  we are passionate in providing solutions to our customers through our creative innovation.
                  </p>
              </div>
              <div className='col-lg-4 value-col'>
                  <h3 className='text-center' style={{color: "#E01265", fontWeight: "600"}}>Passion</h3>
                  <p className='text-center'>
                  we offer an effective approach to your online presence and brand. 
                  we take it as our own, that’s why we are deliberately in delivering
                  what we promise to offer.
                  </p>
              </div>
          </div>
          </div>
          <div className="container d-flex justify-content-center" id="projects-container" style={{width: '100vw'}}>
            <div className="p-container">
              <h1 className="text-start" style={{fontSize: "48px", fontWeight: "600", margin: "3% 50px"}}>Projects</h1>
              <hr/>
              <section className="Projects-section" style={{width: '100vw'}}>
                  <div class="container">
                    <div class="item" id="1">
                      <img className='img-fluid' src="https://images.unsplash.com/photo-1508124780861-b1687f9a13e5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f841d43a63c085e930aa5b6b33e89a9f&auto=format&fit=crop&w=1385&q=80" alt=""/>
                      <div class="text">
                        <h3>Bitskill</h3>
                        <p>A Blockchain based certificate issuance system.</p>
                      </div>
                      <div class="learn-button">View on Github</div>
                    </div>

                    <div class="item" id="2">
                      <img className='img-fluid' src="https://images.unsplash.com/photo-1496492352121-593138d42a61?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3542849cc0459345e3aa82a90ae51a01&auto=format&fit=crop&w=1350&q=80" alt=""/>
                      <div class="text">
                        <h3>AkibaPlus</h3>
                        <p>A product enabling users combine pensions to Sanlam Insurance.</p>
                      </div>
                      <div class="learn-button">View on Github</div>
                    </div>

                    <div class="item" id="3">
                      <img className='img-fluid' src="https://images.unsplash.com/photo-1515215676803-119c88d493cf?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=baf00747bfb9fe41ad9af8cf00dbebbf&auto=format&fit=crop&w=1350&q=80" alt=""/>
                      <div class="text">
                          <h3>Bountiful</h3>
                        <p>Bountiful Safaris products Website</p>
                        </div>
                        <div class="learn-button">View On Github</div>
                    </div>

                    <div class="item" id="4">
                      <img className='img-fluid' src="https://images.unsplash.com/photo-1496939217462-7d42e9a74f0e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5e3be993a88feed38e4f5374ff3ba115&auto=format&fit=crop&w=1350&q=80g" alt=""/>
                      <div class="text">
                        <h3>Imaginarium</h3>
                        <p>An ecommerce platform dealing with IT products and solutions.</p>
                      </div>
                      <div class="learn-button">View on Github</div>
                    </div>

                    <div class="item" id="5">
                      <img className='img-fluid' src="https://images.unsplash.com/photo-1504875427817-937a8a12e167?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cd7f399ba43093ead08e7dbf5e083f09&auto=format&fit=crop&w=1434&q=80" alt=""/>
                      <div class="text">
                        <h3>SCFF</h3>
                        <p>A recruiting agency</p>
                      </div>
                      <div class="learn-button">Learn More</div>
                    </div>

                    <div class="item" id="6">
                      <img className='img-fluid' src="https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f758b0379f730e73c03b6153aaad7cf1&auto=format&fit=crop&w=1350&q=80" alt=""/>
                      <div class="text">
                        <h3>Brandlog</h3>
                        <p>A gifting company</p>
                      </div>
                      <div class="learn-button">View on Github</div>
                    </div>
                </div>
              </section>
            </div>
          </div>
          <div id="large-header" class="large-header">
            <canvas id="demo-canvas"></canvas>
          </div>
          <div className='container d-flex justify-content-center'>
            <form className='contact-form'>
              <h1 class="main-title">Contact <span class="thin">Us</span></h1>
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" name='name' placeholder="Enter Name"/>
              </div>
              <br/>
              <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" class="form-control" id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email"/>
              </div>
              <br/>
              <div class="form-group">
                <label for="message">Message</label>
                <textarea type="text" class="form-control" id="message" placeholder="Type here..."/>
              </div>
              <br/>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>

          <div className='footer' style={{fontFamily: "Roboto", paddingTop: "60px", paddingBottom: "60px", marginTop: "10%", height: "100%"}}>
            <footer class="site-footer">
              <div class="container">
                <div class="row">
                  <div class="col-sm-12 col-md-6">
                    <h6>About Plus digital agency:</h6>
                    <p class="text-justify">
                    We are a Digital agency based in Nairobi, Kenya. 
                    We are dedicated to providing Digital Marketing and Software Development solutions to all sorts of businesses
                     from the smallest to the giants of the market.
                    </p>

                  </div>

                  <div class="col-xs-6 col-md-3">
                    <h6>Solutions</h6>
                    <ul class="footer-links">
                      <li><a href="http://scanfcode.com/category/c-language/">Software Development (Mobile & Web)</a></li>
                      <li><a href="http://scanfcode.com/category/front-end-development/">Product Design (UI/UX Design)</a></li>
                      <li><a href="http://scanfcode.com/category/back-end-development/">Graphic Design</a></li>
                      <li><a href="http://scanfcode.com/category/java-programming-language/">Illustration/Animation</a></li>
                      <li><a href="http://scanfcode.com/category/java-programming-language/">Video/Photo Editing</a></li>
                      <li><a href="http://scanfcode.com/category/android/">SEO</a></li>
                      <li><a href="http://scanfcode.com/category/android/">Social Media Marketing&Management</a></li>
                      <li><a href="http://scanfcode.com/category/android/">Web Analytics</a></li>
                      <li><a href="http://scanfcode.com/category/templates/">Consultation/Training</a></li>
                    </ul>
                  </div>

                  <div class="col-xs-6 col-md-3">
                    <h6>Quick Links</h6>
                    <ul class="footer-links">
                      <li><a href="http://scanfcode.com/about/">About Us</a></li>
                      <li><a href="http://scanfcode.com/contact/">Contact Us</a></li>
                      <li><a href="http://scanfcode.com/contribute-at-scanfcode/">Contribute</a></li>
                      <li><a href="http://scanfcode.com/privacy-policy/">Privacy Policy</a></li>
                      <li><a href="http://scanfcode.com/sitemap/">Sitemap</a></li>
                    </ul>
                  </div>
                </div>
                <hr/>
              </div>
              <div class="container">
                <div class="row">
                  <div class="col-md-8 col-sm-6 col-xs-12">
                    <p class="copyright-text">Copyright &copy; 2023 All Rights Reserved |  
                <a href="#"> Plus Digital Agency</a>.
                    </p>
                  </div>

                  <div className="col-md-4 col-sm-6 col-xs-12">
                    <ul className="social-icons">
                      <li><a className="facebook" href="#"><FaFacebook /></a></li>
                      <li><a className="twitter" href="#"><FaTwitter /></a></li>
                      <li><a className="dribbble" href="#"><FaDribbble /></a></li>
                      <li><a className="linkedin" href="#"><FaLinkedin /></a></li>   
                    </ul>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Scroll>
      </ScrollControls>
    </>
  );
}

export default App;
