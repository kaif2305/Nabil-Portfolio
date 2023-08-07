import React, { useState, useEffect, useRef } from 'react';
import '../Css/about.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

export default function About() {
    const textArray = ["Nabil", "a Full Stack Devloper", "a UI/UX Designer", "Osama Bin L"];
    const typingDelay = 400;
    const erasingDelay = 100;
    const newTextDelay = 2000; // Delay between current and next text
    const [textArrayIndex, setTextArrayIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const [showCursor, setShowCursor] = useState(true);
    const typedTextSpanRef = useRef(null);
    const cursorSpanRef = useRef(null);
    let typeTimeoutRef = useRef(null);

    useEffect(() => {
        const typedTextSpan = typedTextSpanRef.current;
        const cursorSpan = cursorSpanRef.current;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                setCharIndex(charIndex + 1);
                typeTimeoutRef.current = setTimeout(type, typingDelay);
            } else {
                cursorSpan.classList.remove("typing");
                setIsTyping(false);
                typeTimeoutRef.current = setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                setCharIndex(charIndex - 1);
                typeTimeoutRef.current = setTimeout(erase, erasingDelay);
            } else {
                cursorSpan.classList.remove("typing");
                setIsTyping(true);
                setTextArrayIndex((prevIndex) => (prevIndex + 1) % textArray.length);
            }
        }

        if (isTyping) {
            typeTimeoutRef.current = setTimeout(type, typingDelay);
        } else {
            typeTimeoutRef.current = setTimeout(erase, erasingDelay);
        }

        // Blink the cursor when typing or erasing
        cursorSpan.classList.toggle("typing", showCursor);

        const cursorBlinkInterval = setInterval(() => {
            setShowCursor((prevShowCursor) => !prevShowCursor);
        }, 500);

        return () => {
            // Clean up the timeouts and intervals when the component unmounts
            clearInterval(cursorBlinkInterval);
            clearTimeout(typeTimeoutRef.current);
        };
    }, [textArray, textArrayIndex, charIndex, isTyping, showCursor]);
    return (
        <Container>
            <div className="about-flex">

                <div className="about-flex-left">
                    <div className="about-details-upper">


                        <h1> Hello I'm  <span ref={typedTextSpanRef} className="typed-text"></span>
                            <span ref={cursorSpanRef} className={`cursor ${isTyping ? 'typing' : ''}`}></span></h1>

                        <h3>I'm a UX Designer by Day and a
                            Devloper by night. I focus on creating
                            experiences that are functionally and visually
                            comelling.</h3>
                    </div>

                    <div className="about-details-bottom">
                        <h5>Check out my Work &nbsp;</h5>
                        <img src="images/arrow.svg" alt="" />
                    </div>

                </div>
                <div className="about-flex-right">
                    <div className="right-up-corner">
                        <h5>NABIL</h5>
                        <h5>NABI</h5>
                        <h5>NAB</h5>
                        <h5>NA</h5>
                        <h5>N</h5>
                    </div>
                    <img src="images/nabil.jpeg" alt="" />
                    <div className="left-down-corner">
                        <h5>N</h5>
                        <h5>NA</h5>
                        <h5>NAB</h5>
                        <h5>NABI</h5>
                        <h5>NABIL</h5>
                    </div>
                </div>

            </div >
        </Container>
    )
}
