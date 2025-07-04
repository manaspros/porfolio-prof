import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import { contactInfo, socialLinks, contactContent } from '../../data/contact';
import './Contact.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });

  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    // Create animated background elements
    const createParticles = () => {
      if (!sectionRef.current) return;

      // Clear any existing particles
      const existingParticles = document.querySelectorAll('.contact-particle');
      existingParticles.forEach(p => p.remove());

      // Create background particles
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('contact-particle');

        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;

        // Random size
        const size = Math.random() * 8 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.1;

        // Apply animations
        gsap.to(particle, {
          x: `${Math.random() * 200 - 100}`,
          y: `${Math.random() * 200 - 100}`,
          duration: Math.random() * 20 + 20,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });

        sectionRef.current.appendChild(particle);
      }
    };

    // Create glow effects
    const createGlowEffects = () => {
      if (!sectionRef.current) return;

      for (let i = 1; i <= 3; i++) {
        const glow = document.createElement('div');
        glow.classList.add('glow-effect', `contact-glow-${i}`);
        sectionRef.current.appendChild(glow);
      }
    };

    // Create main animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate heading elements
    tl.fromTo(
      '.section-title, .contact-intro',
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      }
    );

    // Animate form container
    gsap.fromTo(
      formRef.current,
      {
        x: -80,
        opacity: 0,
        rotateY: 15
      },
      {
        x: 0,
        opacity: 1,
        rotateY: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%'
        }
      }
    );

    // Animate form elements staggered
    gsap.fromTo(
      '.form-group, .submit-btn',
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%'
        }
      }
    );

    // Animate info items with stagger
    gsap.fromTo(
      '.info-item',
      {
        x: 50,
        opacity: 0,
        rotateY: -10
      },
      {
        x: 0,
        opacity: 1,
        rotateY: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: infoRef.current,
          start: 'top 80%'
        }
      }
    );

    // Animate social links
    gsap.fromTo(
      '.social-link',
      {
        scale: 0,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(2)",
        delay: 0.8,
        scrollTrigger: {
          trigger: infoRef.current,
          start: 'top 70%'
        }
      }
    );

    // Execute background effects
    createParticles();
    createGlowEffects();

    return () => {
      // Cleanup animations
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
      const particles = document.querySelectorAll('.contact-particle');
      particles.forEach(p => {
        gsap.killTweensOf(p);
        p.remove();
      });
      const glows = document.querySelectorAll('.glow-effect');
      glows.forEach(g => {
        gsap.killTweensOf(g);
        g.remove();
      });
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show loading animation
    const btn = e.target.querySelector('button');
    btn.innerHTML = '<span class="loading-spinner"></span> Sending...';
    btn.disabled = true;

    // EmailJS configuration - replace with your actual IDs
    const serviceId = 'YOUR_SERVICE_ID';
    const templateId = 'YOUR_TEMPLATE_ID';
    const publicKey = 'YOUR_PUBLIC_KEY';

    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message
    };

    // Send email using EmailJS
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((result) => {
        console.log('Email sent successfully:', result.text);

        setFormStatus({
          submitted: true,
          error: false,
          message: 'Thank you for your message! I will get back to you soon.'
        });

        // Reset form after submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      })
      .catch((error) => {
        console.error('Failed to send email:', error);

        setFormStatus({
          submitted: true,
          error: true,
          message: 'Sorry, something went wrong. Please try again later.'
        });
      })
      .finally(() => {
        // Reset button
        btn.innerHTML = 'Send Message';
        btn.disabled = false;

        // Show status animation
        gsap.fromTo(
          '.form-status',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
        );

        // Reset status after 5 seconds
        setTimeout(() => {
          gsap.to('.form-status', {
            opacity: 0,
            y: -10,
            duration: 0.5,
            onComplete: () => {
              setFormStatus({
                submitted: false,
                error: false,
                message: ''
              });
            }
          });
        }, 5000);
      });
  };

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="section-container">
        <h2 className="section-title">{contactContent.title}</h2>

        <p className="contact-intro">
          {contactContent.intro}
        </p>

        <div className="contact-grid">
          <div className="contact-form-container" ref={formRef}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What is this about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">Send Message</button>

              {formStatus.submitted && (
                <div className={`form-status ${formStatus.error ? 'error' : 'success'}`}>
                  {formStatus.message}
                </div>
              )}
            </form>
          </div>

          <div className="contact-info" ref={infoRef}>
            {contactInfo.map(info => (
              <div className="info-item" key={info.id}>
                <div className="info-icon">{info.icon}</div>
                <div className="info-content">
                  <h3>{info.title}</h3>
                  <p>{info.content.split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < info.content.split('\n').length - 1 && <br />}
                    </span>
                  ))}</p>
                </div>
              </div>
            ))}

            <div className="social-links">
              {socialLinks.map(link => (
                <a 
                  key={link.id}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                  title={link.platform}
                >
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
