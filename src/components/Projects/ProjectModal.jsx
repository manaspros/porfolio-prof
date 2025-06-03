import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './ProjectModal.css';

const ProjectModal = ({ project, isOpen, onClose }) => {
    const modalRef = useRef(null);
    const contentRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        if (isOpen && modalRef.current) {
            // Animate modal opening
            gsap.set(modalRef.current, { display: 'flex' });
            gsap.fromTo(overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: "power2.out" }
            );
            gsap.fromTo(contentRef.current,
                {
                    scale: 0.8,
                    opacity: 0,
                    rotationY: -15,
                    y: 50
                },
                {
                    scale: 1,
                    opacity: 1,
                    rotationY: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "back.out(1.7)",
                    delay: 0.1
                }
            );

            // Animate tech tags
            const techTags = contentRef.current?.querySelectorAll('.modal-tech-tag');
            if (techTags) {
                gsap.fromTo(techTags,
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.4,
                        stagger: 0.1,
                        ease: "back.out(1.7)",
                        delay: 0.3
                    }
                );
            }

            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        } else if (modalRef.current) {
            // Animate modal closing
            gsap.to(contentRef.current, {
                scale: 0.8,
                opacity: 0,
                rotationY: 15,
                y: -50,
                duration: 0.3,
                ease: "power2.in"
            });
            gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    if (modalRef.current) {
                        gsap.set(modalRef.current, { display: 'none' });
                    }
                }
            });

            // Restore body scroll
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current) {
            e.preventDefault();
            e.stopPropagation();
            onClose();
        }
    };

    const handleCloseClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClose();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    if (!project) return null;

    return (
        <div
            className="project-modal"
            ref={modalRef}
            style={{ display: 'none' }}
        >
            <div
                className="modal-overlay"
                ref={overlayRef}
                onClick={handleOverlayClick}
            >
                <div className="modal-content" ref={contentRef}>
                    <button
                        className="modal-close"
                        onClick={handleCloseClick}
                        type="button"
                        aria-label="Close modal"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>

                    <div className="modal-header">
                        <div className="modal-image">
                            <img src={project.image} alt={project.title} />
                            <div className="modal-image-overlay"></div>
                        </div>
                        <div className="modal-title-section">
                            <h2 className="modal-title">{project.title}</h2>
                            <div className="modal-category">
                                <span className="category-badge">{project.category}</span>
                            </div>
                        </div>
                    </div>

                    <div className="modal-body">
                        <div className="modal-description">
                            <h3>Project Overview</h3>
                            <p>{project.description}</p>
                            <p>
                                This innovative robotic system represents cutting-edge technology in the field of
                                robotics and human-machine interaction. Designed with precision and user-centric
                                approach, it aims to enhance human capabilities and provide assistance in various
                                real-world scenarios.
                            </p>
                        </div>

                        <div className="modal-technologies">
                            <h3>Technologies Used</h3>
                            <div className="modal-tech-grid">
                                {project.technologies.map((tech, index) => (
                                    <span key={index} className="modal-tech-tag">{tech}</span>
                                ))}
                            </div>
                        </div>

                        <div className="modal-features">
                            <h3>Key Features</h3>
                            <ul className="features-list">
                                <li>Advanced motion control and precision handling</li>
                                <li>Intuitive user interface and seamless integration</li>
                                <li>Robust construction with lightweight materials</li>
                                <li>Adaptive learning capabilities for improved performance</li>
                                <li>Safety-first design with multiple fail-safe mechanisms</li>
                            </ul>
                        </div>

                        <div className="modal-applications">
                            <h3>Applications</h3>
                            <div className="applications-grid">
                                <div className="application-item">
                                    <h4>Medical Assistance</h4>
                                    <p>Supporting healthcare professionals and patients</p>
                                </div>
                                <div className="application-item">
                                    <h4>Industrial Automation</h4>
                                    <p>Enhancing manufacturing and assembly processes</p>
                                </div>
                                <div className="application-item">
                                    <h4>Research & Development</h4>
                                    <p>Advancing robotics and AI research initiatives</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <div className="modal-actions">
                            <a href="https://www.youtube.com/channel/UClkWY-vpshRUFWZut_gqZhQ/videos"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="modal-btn primary">
                                Watch Demo Video
                            </a>
                            <a href="#contact"
                                className="modal-btn secondary"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onClose();
                                    // Small delay to ensure modal closes first
                                    setTimeout(() => {
                                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                    }, 300);
                                }}>
                                Contact for Details
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
