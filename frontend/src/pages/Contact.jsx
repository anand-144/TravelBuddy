import React, { useState } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
    const [form, setForm] = useState({
        from_name: "",
        from_email: "",
        subject: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);

    // 🔹 Handle input change
    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    // 🔹 Submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        emailjs
            .send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    to_name: "Anand Singh", // matches {{to_name}}
                    from_name: form.from_name, // matches {{from_name}}
                    from_email: form.from_email, // matches {{from_email}}
                    subject: form.subject, // matches {{subject}}
                    message: form.message, // matches {{message}}
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )
            .then(
                () => {
                    alert("✅ Your message has been sent successfully!");
                    setForm({ from_name: "", from_email: "", subject: "", message: "" });
                    setLoading(false);
                },
                (error) => {
                    console.error("❌ Email send error:", error);
                    alert("Something went wrong. Please try again later.");
                    setLoading(false);
                }
            );
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-24 lg:px-56 bg-gradient-to-b from-white to-sky-50">
            <h1 className="text-4xl font-bold text-sky-700 mb-6">Contact Us</h1>
            <p className="text-gray-700 text-center max-w-2xl mb-8">
                Have a question, suggestion, or just want to say hello?
                Fill out the form below and we’ll get back to you shortly.
            </p>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg"
            >
                {/* Name */}
                <div className="mb-4">
                    <label className="block text-left text-gray-700 mb-2">Your Name</label>
                    <input
                        type="text"
                        name="from_name"
                        value={form.from_name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="John Doe"
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-left text-gray-700 mb-2">Your Email</label>
                    <input
                        type="email"
                        name="from_email"
                        value={form.from_email}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="johndoe@email.com"
                    />
                </div>

                {/* Subject */}
                <div className="mb-4">
                    <label className="block text-left text-gray-700 mb-2">Subject</label>
                    <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="Your message subject"
                    />
                </div>

                {/* Message */}
                <div className="mb-6">
                    <label className="block text-left text-gray-700 mb-2">Message</label>
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="Write your message here..."
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full text-white font-semibold py-3 rounded-lg transition ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-sky-600 hover:bg-sky-700"
                        }`}
                >
                    {loading ? "Sending..." : "Send Message"}
                </button>
            </form>
        </div>
    );
};

export default Contact;
