import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css'; // Include basic styles if necessary

const App = () => {
    const courses = [
        {
            title: 'What is JavaScript',
            description: 'Introduction and 1st program',
            imgSrc: 'path_to_js_image', // Replace with the image path for JS
            rating: '4.5',
            price: '$19.99'
        },
        {
            title: 'Python Crash Course',
            description: 'Advanced Python Programming',
            imgSrc: 'path_to_python_image', // Replace with the image path for Python
            rating: '4.8',
            price: '$29.99'
        },
        {
            title: 'Gemini Clone',
            description: 'Build your own version',
            imgSrc: 'path_to_gemini_image', // Replace with the image path for Gemini
            rating: '4.6',
            price: '$49.99'
        },
        {
            title: 'Cybersecurity Basics',
            description: 'Largest Crypto Marketplace',
            imgSrc: 'path_to_cybersecurity_image', // Replace with the image path for Cybersecurity
            rating: '4.7',
            price: '$24.99'
        },
    ];

    const testimonials = [
        { name: 'David Jediman', rating: 5, comment: 'Fantastic course quality!' },
        { name: 'Richard Maten', rating: 5, comment: 'Loved the content and presentation!' },
        { name: 'James Washington', rating: 5, comment: 'Great instructors and materials!' },
    ];

    return (
        <div className="container">
            <header className="header">
                <h1>Empower your future with the courses designed to fit your choice.</h1>
                <button className="search-button">Search</button>
            </header>
            <section className="courses">
                {courses.map((course, index) => (
                    <div key={index} className="course-card">
                        <img src={course.imgSrc} alt={course.title} />
                        <h2>{course.title}</h2>
                        <p>{course.description}</p>
                        <span>Rating: {course.rating}</span>
                        <div className="price">{course.price}</div>
                    </div>
                ))}
            </section>
            <section className="testimonials">
                <h2>Testimonials</h2>
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="testimonial">
                        <h3>{testimonial.name}</h3>
                        <span>{'★'.repeat(testimonial.rating)}</span>
                        <p>{testimonial.comment}</p>
                    </div>
                ))}
            </section>
            <footer className="footer">
                <p>Learn anything, anytime, anywhere</p>
                <button className="get-started">Get Started</button>
            </footer>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
