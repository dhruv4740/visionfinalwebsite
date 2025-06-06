"use client";
import { useState } from "react";
import emailjs from '@emailjs/browser';

export default function ContactSection() {
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  // EmailJS notification function for contact form
  const sendContactNotification = async (contactData) => {
    try {
      console.log('🔍 Attempting to send contact notification...');
      
      // Initialize EmailJS
      emailjs.init("tISC2MZ5Yqbq_-56-");
      
      // Send email notification using EmailJS
      const result = await emailjs.send(
        "service_too91xe", // Same service ID
        "template_r699aa8", // Your contact template ID
        {
          // Template variables for contact form
          user_name: contactData.name,
          user_email: contactData.email,
          message: contactData.message,
          to_name: "Vision KJSCE Team",
          reply_to: contactData.email,
          from_name: contactData.name,
          from_email: contactData.email,
          subject: `Contact Form Message from ${contactData.name}`,
        }
      );
      
      console.log('✅ Contact notification sent successfully!', result);
      return true;
    } catch (error) {
      console.error('❌ Contact notification failed:', error);
      return false;
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    
    try {
      console.log('📧 Submitting contact form:', contactForm);
      
      // 1. Save to database via API
      const apiResponse = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      });

      if (!apiResponse.ok) {
        throw new Error('Failed to save contact message');
      }

      // 2. Send email notification
      const emailSent = await sendContactNotification(contactForm);
      
      if (emailSent) {
        setSubmitMessage("Thank you! Your message has been sent successfully and saved to our system.");
        setContactForm({ name: "", email: "", message: "" });
      } else {
        // API worked but email failed
        setSubmitMessage("Your message has been saved successfully. We'll get back to you soon!");
        setContactForm({ name: "", email: "", message: "" });
      }
      
    } catch (error) {
      console.error('Contact form error:', error);
      
      // If API fails, still try to send email
      try {
        const emailSent = await sendContactNotification(contactForm);
        if (emailSent) {
          setSubmitMessage("Message sent via email, but there was an issue saving to our system. We'll still respond to you!");
          setContactForm({ name: "", email: "", message: "" });
        } else {
          setSubmitMessage("Error: Failed to send message. Please try again or email us directly.");
        }
      } catch (emailError) {
        setSubmitMessage("Error: Failed to send message. Please try again or email us directly.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 animate-on-scroll relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gold mb-8">Get In Touch</h2>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            Ready to join our AR/VR journey? Let's connect and build the future together.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-gray-900/40 to-black/20 rounded-2xl border border-gold/30 backdrop-blur-sm">
              <div className="p-4 bg-gradient-to-br from-gold/20 to-gold-light/20 rounded-full border border-gold/40">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <p className="text-gray-100 font-semibold text-lg">teamvision.engg@somaiya.edu</p>
                <p className="text-gray-300">General inquiries and collaboration</p>
              </div>
            </div>
            <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-gray-900/40 to-black/20 rounded-2xl border border-gold/30 backdrop-blur-sm">
              <div className="p-4 bg-gradient-to-br from-gold/20 to-gold-light/20 rounded-full border border-gold/40">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <p className="text-gray-100 font-semibold text-lg">KJ Somaiya School of Engineering</p>
                <p className="text-gray-300">Vidyavihar, Mumbai, India</p>
              </div>
            </div>
          </div>
          <form onSubmit={handleContactSubmit} className="space-y-6 p-8 bg-gradient-to-br from-gray-900/40 to-black/20 rounded-2xl border border-gold/30 shadow-xl backdrop-blur-sm">
            {["name", "email", "message"].map((f, i) => (
              <div key={i}>
                <label className="block text-sm font-semibold text-gold mb-3 capitalize">{f}</label>
                {f !== "message" ? (
                  <input
                    type={f === "email" ? "email" : "text"}
                    name={f}
                    value={contactForm[f]}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-gold/40 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold/70 transition-all text-white placeholder-gray-500"
                    placeholder={`Enter your ${f}`}
                  />
                ) : (
                  <textarea
                    name={f}
                    value={contactForm[f]}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-gold/40 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold/70 transition-all text-white placeholder-gray-500 resize-none"
                    placeholder="Enter your message"
                  />
                )}
              </div>
            ))}
            {submitMessage && (
              <div className={`p-4 rounded-lg border ${submitMessage.includes("Error") ? "bg-red-900/50 border-red-500/50 text-red-300" : "bg-green-900/50 border-green-500/50 text-green-300"}`}>
                {submitMessage}
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gold text-black font-bold text-lg rounded-lg hover:shadow-xl hover:shadow-gold/30 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}