import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ScrollControls, Scroll, Environment, Float } from '@react-three/drei';
import { Bloom, DepthOfField, EffectComposer, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { React, useEffect, useRef } from 'react'; 
import * as dat from 'dat.gui'

//Images
import Image1 from "../Assets/Plus Agency logo.png";

function SecondAnime() {


  return (
    <>
         <div id='second-anime'>
          <img src={Image1} className="image-fluid"/>
        </div>
    </>
  );
}

export default SecondAnime;
