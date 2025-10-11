"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Send, Github, Linkedin, Twitter, Check, Loader2 } from "lucide-react"

const contactInfo = [
	{
		icon: Mail,
		label: "Email",
		value: "arunsivagnanamurthy@gmail.com",
		href: "mailto:arunsivagnanamurthy@gmail.com",
	},
	{
		icon: MapPin,
		label: "Location",
		value: "Tamil Nadu, Chennai",
		href: "#",
	},
]

const socialLinks = [
	{ icon: Github, href: "https://github.com/Arun-S-1505", label: "GitHub" },
	{
		icon: Linkedin,
		href: "https://www.linkedin.com/in/arun-saravanan-s/",
		label: "LinkedIn",
	},
	{ icon: Twitter, href: "https://x.com/arunsarava68426", label: "Twitter" },
]

export default function ContactSection() {
	const ref = useRef(null)
	const [isVisible, setIsVisible] = useState(false)
	const [hasAnimated, setHasAnimated] = useState(false)
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !hasAnimated) {
					setIsVisible(true)
					setHasAnimated(true)
					observer.disconnect()
				}
			},
			{ threshold: 0.15, rootMargin: "-50px" }
		)

		if (ref.current) {
			observer.observe(ref.current)
		}

		return () => observer.disconnect()
	}, [hasAnimated])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)
		setSubmitStatus('idle')
		
		try {
			const res = await fetch("/api/send-email", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			})
			if (res.ok) {
				setSubmitStatus('success')
				setFormData({ name: "", email: "", message: "" })
				// Reset button after 3 seconds
				setTimeout(() => {
					setSubmitStatus('idle')
				}, 3000)
			} else {
				setSubmitStatus('error')
				setTimeout(() => {
					setSubmitStatus('idle')
				}, 3000)
			}
		} catch (error) {
			setSubmitStatus('error')
			setTimeout(() => {
				setSubmitStatus('idle')
			}, 3000)
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	return (
		<section id="contact" className="py-8" ref={ref}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div
					className={`text-center mb-8 ${
						isVisible ? "animate-fade-in-up" : "opacity-0"
					}`}
				>
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
						Get In Touch
					</h2>
					<p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto text-balance px-4 sm:px-0">
						Ready to start your next project? Let&apos;s create something
						amazing together.
					</p>
				</div>

				<div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
					{/* Contact Information */}
					<div
						className={`space-y-6 lg:space-y-8 ${
							isVisible
								? "animate-fade-in-left"
								: "opacity-0"
						}`}
						style={{ animationDelay: isVisible ? "0.2s" : "0s" }}
					>
						<div>
							<h3 className="text-2xl font-bold mb-4">Let&apos;s Connect</h3>
							<p className="text-muted-foreground mb-6 leading-relaxed">
								I&apos;m always interested in hearing about new projects and
								opportunities. Whether you&apos;re a company looking to hire, or
								you&apos;re a fellow developer wanting to collaborate, I&apos;d
								love to hear from you.
							</p>
						</div>

						<div className="space-y-4">
							{contactInfo.map((item, index) => (
								<a
									key={index}
									href={item.href}
									className={`flex items-center p-3 sm:p-4 rounded-lg glass hover:bg-primary/5 transition-all duration-250 group ${
										isVisible
											? "animate-fade-in-up"
											: "opacity-0"
									}`}
									style={{ animationDelay: isVisible ? `${0.4 + index * 0.1}s` : "0s" }}
								>
									<div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center mr-3 sm:mr-4 group-hover:scale-110 transition-transform flex-shrink-0">
										<item.icon size={18} className="text-primary-foreground sm:w-5 sm:h-5" />
									</div>
									<div className="min-w-0 flex-1">
										<p className="font-semibold text-sm sm:text-base">{item.label}</p>
										<p className="text-muted-foreground text-sm sm:text-base break-words">
											{item.value}
										</p>
									</div>
								</a>
							))}
						</div>

						<div
							className={`pt-8 ${
								isVisible
									? "animate-fade-in-up"
									: "opacity-0"
							}`}
							style={{ animationDelay: isVisible ? "0.8s" : "0s" }}
						>
							<h4 className="text-base sm:text-lg font-semibold mb-4">Follow Me</h4>
							<div className="flex space-x-3 sm:space-x-4">
								{socialLinks.map((social, index) => (
									<a
										key={index}
										href={social.href}
										className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center text-primary-foreground hover:shadow-lg transition-all duration-200 hover:scale-110 hover:-translate-y-1"
									>
										<social.icon size={18} className="sm:w-5 sm:h-5" />
									</a>
								))}
							</div>
						</div>
					</div>

					{/* Contact Form */}
					<div
						className={`${
							isVisible
								? "animate-fade-in-right"
								: "opacity-0"
						}`}
						style={{ animationDelay: isVisible ? "0.4s" : "0s" }}
					>
						<Card className="glass border-0 shadow-2xl">
							<CardContent className="p-4 sm:p-6 lg:p-8">
								<h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Send Message</h3>
								<form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
									<div
										className={`${
											isVisible
												? "animate-fade-in-up"
												: "opacity-0"
										}`}
										style={{ animationDelay: isVisible ? "0.6s" : "0s" }}
									>
										<Input
											name="name"
											placeholder="Your Name"
											value={formData.name}
											onChange={handleChange}
											className="glass border-primary/20 focus:border-primary"
											required
										/>
									</div>

									<div
										className={`${
											isVisible
												? "animate-fade-in-up"
												: "opacity-0"
										}`}
										style={{ animationDelay: isVisible ? "0.7s" : "0s" }}
									>
										<Input
											name="email"
											type="email"
											placeholder="Your Email"
											value={formData.email}
											onChange={handleChange}
											className="glass border-primary/20 focus:border-primary"
											required
										/>
									</div>

									<div
										className={`${
											isVisible
												? "animate-fade-in-up"
												: "opacity-0"
										}`}
										style={{ animationDelay: isVisible ? "0.8s" : "0s" }}
									>
										<Textarea
											name="message"
											placeholder="Your Message"
											value={formData.message}
											onChange={handleChange}
											rows={5}
											className="glass border-primary/20 focus:border-primary resize-none"
											required
										/>
									</div>

									<div
										className={`${
											isVisible
												? "animate-fade-in-up"
												: "opacity-0"
										}`}
										style={{ animationDelay: isVisible ? "0.9s" : "0s" }}
									>
										<Button
											type="submit"
											disabled={isSubmitting || submitStatus === 'success'}
											className={`w-full py-3 font-semibold transition-all duration-300 transform hover:scale-105 ${
												submitStatus === 'success' 
													? 'bg-green-600 hover:bg-green-600' 
													: submitStatus === 'error'
													? 'bg-red-600 hover:bg-red-600'
													: 'bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-purple-600'
											} text-primary-foreground`}
										>
											{isSubmitting ? (
												<>
													<Loader2 size={18} className="mr-2 animate-spin" />
													Sending...
												</>
											) : submitStatus === 'success' ? (
												<>
													<Check size={18} className="mr-2" />
													Message Sent!
												</>
											) : submitStatus === 'error' ? (
												<>
													<Send size={18} className="mr-2" />
													Failed - Try Again
												</>
											) : (
												<>
													<Send size={18} className="mr-2" />
													Send Message
												</>
											)}
										</Button>
									</div>
								</form>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	)
}
