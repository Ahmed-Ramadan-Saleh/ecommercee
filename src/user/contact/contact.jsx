import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Contact = () => {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form Submitted:", formData);
      alert("Thank you for your message! We will get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  // Contact Info Data
  const contactInfo = [
    {
      title: "Visit Us",
      details: ["123 Fashion Street", "New York, NY 10001", "United States"],
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
    },
    {
      title: "Call Us",
      details: ["+1 (555) 123-4567", "Mon-Fri: 9am - 6pm EST", "Sat: 10am - 4pm EST"],
      icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    },
    {
      title: "Email Us",
      details: ["support@shop.co", "press@shop.co", "careers@shop.co"],
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - SHOP.CO</title>
      </Helmet>
      <div className="bg-texture px-4">

        {/* Page Header */}
        <div className="bg-muted dark:bg-gray-900 py-8 lg:py-12 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center text-sm text-secondary mb-4">
              <Link to="/" className="hover:text-industrial-red transition-colors">Home</Link>
              <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              <span className="text-primary">Contact</span>
            </nav>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-primary">
              Contact Us
            </h1>
            <p className="text-secondary mt-2 max-w-xl">
              We'd love to hear from you. Our team is here to help.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <section className="py-12 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Contact Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {contactInfo.map((info) => (
                <div 
                  key={info.title}
                  className="bg-surface border border-line rounded-2xl p-8 text-center hover:shadow-lg transition-shadow animate-fade-up"
                >
                  <div className="w-14 h-14 bg-industrial-red/10 dark:bg-industrial-red/20 rounded-xl flex items-center justify-center mx-auto mb-4 text-industrial-red">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d={info.icon} />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-3 text-primary">{info.title}</h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-sm text-secondary leading-relaxed">
                      {detail}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {/* Form & Map Row */}
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
              
              {/* Contact Form */}
              <div className="lg:col-span-3 animate-fade-up">
                <div className="bg-surface rounded-2xl border border-line p-8 lg:p-10 shadow-sm">
                  <h2 className="font-display text-2xl font-bold mb-6 text-primary">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="form-input w-full px-4 py-3 rounded-xl"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="form-input w-full px-4 py-3 rounded-xl"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="form-input w-full px-4 py-3 rounded-xl"
                        placeholder="How can we help?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">Message</label>
                      <textarea
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="form-input w-full px-4 py-3 rounded-xl resize-none"
                        placeholder="Write your message here..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full py-4 rounded-full font-semibold relative z-10 disabled:opacity-70"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </div>
              </div>

              {/* Map / Image */}
              <div className="lg:col-span-2 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                <div className="h-full min-h-[400px] bg-muted rounded-2xl overflow-hidden relative border border-line">
                   <img 
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80" 
                      alt="Location Map"
                      className="w-full h-full object-cover"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                   <div className="absolute bottom-0 left-0 p-6 text-white">
                      <h3 className="font-semibold text-lg">Our Flagship Store</h3>
                      <p className="text-sm text-gray-200">123 Fashion Street, NYC</p>
                      <a href="#" className="text-sm font-medium text-industrial-red mt-2 inline-block hover:underline">
                        Get Directions
                      </a>
                   </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FAQ CTA */}
        <section className="py-12 lg:py-16 bg-muted dark:bg-gray-900 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-surface rounded-2xl p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-6 border border-line shadow-sm">
              <div className="text-center md:text-left">
                <h2 className="font-display text-2xl font-bold mb-2 text-primary">Looking for quick answers?</h2>
                <p className="text-secondary">Check out our FAQ section for immediate assistance.</p>
              </div>
              <a 
                href="#" 
                className="btn-secondary px-8 py-3 rounded-full font-semibold whitespace-nowrap border-line"
              >
                View FAQs
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Contact;