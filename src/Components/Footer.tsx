import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styles/footer.css'

const Footer = () => {

    const navigate = useNavigate()

    return (
        <footer>
            <div className="footer-laptop">
                <div className="content-one">
                    <h2>Got a show, event, activity or a great experience? Partner with us & get listed on MovieMatic</h2>
                </div>
                <hr className='footer-hr' />
                <div className="content-two">
                    <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h6>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis consequatur vel, rem qui dignissimos harum exercitationem provident accusamus minus doloremque sequi eius nostrum quos nihil repellendus vero. Ex, soluta voluptatem.</p>
                    <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h6>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis consequatur vel, rem qui dignissimos harum exercitationem provident accusamus minus doloremque sequi eius nostrum quos nihil repellendus vero. Ex, soluta voluptatem.</p>
                    <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h6>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis consequatur vel, rem qui dignissimos harum exercitationem provident accusamus minus doloremque sequi eius nostrum quos nihil repellendus vero. Ex, soluta voluptatem.</p>
                    <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h6>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis consequatur vel, rem qui dignissimos harum exercitationem provident accusamus minus doloremque sequi eius nostrum quos nihil repellendus vero. Ex, soluta voluptatem.</p>
                    <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h6>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis consequatur vel, rem qui dignissimos harum exercitationem provident accusamus minus doloremque sequi eius nostrum quos nihil repellendus vero. Ex, soluta voluptatem.</p>

                </div>
                <div className="content-three">
                    <img src="/Images/instagram.png" alt="instagram" />
                    <img src="/Images/facebook.png" alt="facebook" />
                    <img src="/Images/youtube.png" alt="youtube" />
                    <img src="/Images/linkedin.png" alt="linkedin" />
                </div>
                <div className="content-four">
                    <p>Copyright © 07-02-2025 Blue_Bird. All rights reserved.</p>
                </div>
            </div>

            <div className="footer-mobile">
                <div className="footer-home-container">
                    <span onClick={() => navigate('/home')}>Home</span>
                </div>
                <div className="footer-movie-container">
                    <span onClick={() => navigate('/movies')}>movies</span>
                </div>
                <div className="footer-events-container">
                    <span>events</span>
                </div>
                <div className="footer-profile-container">
                    <span>profile</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer