import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import SectionContainer from "../../components/SectionContainer/SectionContainer";
import { MdContactMail } from "react-icons/md";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: integrate with backend or email service
    alert("Thank you for contacting us!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <SectionContainer className=" customGradiant1">
    <h1 className="text-4xl font-bold text-center text-primary mb-4 flex items-center justify-center gap-2">
     <MdContactMail/> Contact CollabEd 
    </h1>
      <p className="text-center mb-10 max-w-xl mx-auto">
        Have a question, suggestion, or just want to say hi? We'd love to hear
        from you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <FaEnvelope className="text-xl text-secondary mt-1" />
            <div>
              <h4 className="font-semibold text-base-content">Email</h4>
              <p className="text-sm text-base-content/70">
                support@collabed.com
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaPhone className="text-xl text-secondary mt-1" />
            <div>
              <h4 className="font-semibold text-base-content">Phone</h4>
              <p className="text-sm text-base-content/70">+880 1234 567 890</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-xl text-secondary mt-1" />
            <div>
              <h4 className="font-semibold text-base-content">Location</h4>
              <p className="text-sm text-base-content/70">Dhaka, Bangladesh</p>
            </div>
          </div>

          {/* Optional Map */}
          <iframe
            title="Google Map"
            className="w-full h-64 rounded-lg shadow"
            src="https://maps.google.com/maps?q=Dhaka&t=&z=13&ie=UTF8&iwloc=&output=embed"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-base-200 p-8 rounded-2xl shadow border border-base-300"
        >
          <div>
            <label className="block mb-1 font-medium text-base-content">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-base-content">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-base-content">
              Message
            </label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="textarea textarea-bordered w-full"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Send Message
          </button>
        </form>
      </div>
    </SectionContainer>
  );
};

export default Contact;
