import React from 'react';
import Navbar from '../components/Navbar';

const AboutUs = () => {
 
  return (
    <>
    <Navbar/>
    <div className="bg-white text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Cloth-Hub</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Discover fashion with purpose. Cloth-Hub is your trusted platform for comfort, style, and modern trends.
        </p>
      </section>

      {/* Who We Are Section */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-6">Who We Are</h2>
        <p className="text-lg leading-relaxed text-center">
          We are an online clothing store that believes in empowering people to look and feel confident. Our collections
          are crafted with quality, sustainability, and style in mind — offering clothing for every occasion and
          personality.
        </p>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-100 py-16 px-6">
        <h2 className="text-3xl font-semibold text-center mb-6">Our Mission</h2>
        <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto">
          To revolutionize online fashion by delivering comfortable, ethical, and affordable clothing. We aim to create
          a seamless shopping experience while encouraging conscious consumerism.
        </p>
      </section>

      {/* Our Values Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10">What We Stand For</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              title: 'Quality',
              description:
                'We ensure every item goes through quality checks and uses premium materials built to last.',
            },
            {
              title: 'Affordability',
              description:
                'Fashion shouldn’t be expensive. We offer stylish collections at pocket-friendly prices.',
            },
            {
              title: 'Customer First',
              description:
                'Your satisfaction drives our decisions. We’re always improving your shopping journey.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white shadow-md rounded-xl p-6 border hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-indigo-600 text-white text-center py-12 px-6">
        <h2 className="text-3xl font-semibold mb-4">Be a Part of the Cloth-Hub Family</h2>
        <p className="mb-6 text-lg">Join thousands of happy customers who trust us with their fashion needs.</p>
        <a
          href="/"
          className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Explore Products
        </a>
      </section>
    </div>
    </>
  );
};

export default AboutUs;
