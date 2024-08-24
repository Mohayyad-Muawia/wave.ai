import { Link } from "react-router-dom";

const About = () => {
    return (  
        <>
        <div className="about">
            <h1>About This Chatbot</h1>
            <div className="info">
                
                <p>Welcome to <span>Wave!</span> Powered by the <span>Gemini API</span>, this chatbot is designed to assist you with any thing. Whether you're looking for quick answers, support, or just exploring, Wave is here to help.</p>
              
                <h3>Wave Features:-</h3>
                <ul>
                    <li>Real-Time Assistance: Get instant responses to your queries, 24/7.</li>
                    <li>Dark/Light mode support: You can choose the theme you want.</li>
                    <li>Seamless Integration: Connect with various services and platforms effortlessly like <a href="https://google.com" target="_blank">Google Serch Engine</a></li>
                </ul>

                <h3>Technology:-</h3>
                <p>Wave built with sevral modern web technologies like: <br /> Google Gemini API <span> - </span> React js <span> - </span> Node js <span> - </span> Express js</p>

                <h3>The Developer:-</h3>
                <p>Hi, I am <a href="https://www.facebook.com/profile.php?id=100085583352711&mibextid=ZbWKwL" target="blank">Mohayyad Muawia</a>,  a Junior Web Developer. I specialize in HTML, CSS, JavaScript, Bootstrap, and React.js.</p>

                <p>With a strong background in creating user-friendly and visually appealing web interfaces, I have completed several projects, including building dynamic web applications using the <span>MERN</span> stack <span>(</span>MongoDB<span>,</span> Express<span>,</span> React<span>,</span> Node.js<span>)</span>. My goal is to create digital experiences that are not only functional but also engaging for users.</p>

                <p>Currently based in <span>Sudan</span>, I work remotely and am constantly exploring new technologies to enhance my skills and deliver better solutions. This chatbot, powered by the <span>Gemini API</span>, is one of my latest projects, designed to help users interact seamlessly with our platform.</p>

                <p>If you'd like to know more about my work or get in touch, feel free to visit my <a href="https://www.facebook.com/profile.php?id=100085583352711&mibextid=ZbWKwL" target="_blank" >Facebook page</a> or email me on <a href="mailto:mohayyad2.0@gmail.com.com">Mohayyad2.0@gmail.com</a>.</p>

            </div>
            <Link className="return" to='/'><i class="fa-solid fa-reply-all"></i> Return to the Chat</Link>
        </div>
        </>
    );
}
 
export default About;