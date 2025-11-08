import React, { useState } from "react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import { FaPaperPlane, FaMapMarkedAlt, FaEnvelopeOpenText, FaPhoneAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const Contact = () => {
  const [form, setForm] = useState({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_name: "Anand Singh",
          from_name: form.from_name,
          from_email: form.from_email,
          subject: form.subject,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          toast.success("Your message has been sent successfully!");
          setForm({ from_name: "", from_email: "", subject: "", message: "" });
          setLoading(false);
        },
        (error) => {
          toast.error("Email send error:", error);
          alert("Something went wrong. Please try again later.");
          setLoading(false);
        }
      );
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 via-sky-100 to-white flex flex-col items-center justify-center py-20 px-6 sm:px-16 lg:px-40 overflow-hidden">

      <div className="absolute -top-40 -left-32 w-96 h-96 bg-sky-400/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }}></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 z-10"
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold text-sky-700 mb-4">
          Get in Touch
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Have questions, feedback, or ideas? We'd love to hear from you!
          Fill out the form below and our team will get back to you soon.
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative bg-white/80 backdrop-blur-2xl shadow-2xl border border-white/30 rounded-3xl p-8 sm:p-12 w-full max-w-2xl z-10"
      >
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-sky-500 to-blue-600 p-4 rounded-full shadow-lg">
          <FaPaperPlane className="text-white text-2xl" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-left">Your Name</label>
            <input
              type="text"
              name="from_name"
              value={form.from_name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 text-left">Your Email</label>
            <input
              type="email"
              name="from_email"
              value={form.from_email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all"
              placeholder="johndoe@email.com"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-gray-700 font-medium mb-2 text-left">Subject</label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all"
            placeholder="Your message subject"
          />
        </div>

        <div className="mt-6">
          <label className="block text-gray-700 font-medium mb-2 text-left">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows="5"
            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all resize-none"
            placeholder="Write your message here..."
          ></textarea>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          className={`mt-8 w-full py-4 font-bold text-lg rounded-xl shadow-lg text-white transition-all duration-300 ${loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-sky-600 to-blue-700 hover:from-blue-600 hover:to-sky-700"
            }`}
        >
          {loading ? "Sending..." : "Send Message"}
        </motion.button>
      </motion.form>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-16 text-gray-600 text-center z-10"
      >
        <div className="flex items-center gap-3">
          <FaEnvelopeOpenText className="text-sky-500 text-xl" />
          <span>support@travelbuddy.ai</span>
        </div>
        <div className="flex items-center gap-3">
          <FaPhoneAlt className="text-sky-500 text-xl" />
          <span>+91 1234567890</span>
        </div>
        <div className="flex items-center gap-3">
          <FaMapMarkedAlt className="text-sky-500 text-xl" />
          <span>Mumbai, India</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
