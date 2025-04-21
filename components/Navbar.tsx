'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import SignOutButton from './auth/SignOutButton'

const navLinks = [
    { href: "/about", text: "Sobre" },
    { href: "/blog", text: "Blog" },
    { href: "/faq", text: "Dúvidas" },
    { href: "/services", text: "Serviços" }
]

interface NavLinkProps {
    href: string
    text: string
    onClick?: () => void
    className?: string
}

const NavLink = ({ href, text, onClick, className = "" }: NavLinkProps) => (
    <Link
        href={href}
        onClick={onClick}
        className={`text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors font-medium ${className}`}
    >
        {text}
    </Link>
)

const MenuButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
    <button
        onClick={onClick}
        className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
    >
        <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
            ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
            )}
        </svg>
    </button>
)

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()
    const { data: session } = useSession()

    const handleLinkClick = () => {
        setIsMobileMenuOpen(false)
    }

    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [pathname])

    const dashboardLink = session?.user?.role === 'admin' ? '/admin' : '/cliente/dashboard'
    const dashboardText = session?.user?.role === 'admin' ? 'Área Admin' : 'Área do Cliente'

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    {/* Left Links - Hidden on Mobile */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.slice(0, 3).map(link => (
                            <NavLink key={link.href} {...link} />
                        ))}
                    </div>

                    {/* Center Logo */}
                    <Link
                        href="/"
                        className="relative w-45 h-20 hover:opacity-90 transition-opacity  p-2 rounded-lg"
                    >
                        <Image
                            src="/LogoBranco.png"
                            alt="VetPay Logo"
                            fill
                            style={{ objectFit: 'contain' }}
                            priority
                            className=""
                        />
                    </Link>

                    {/* Right Links - Hidden on Mobile */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink href="/services" text="Serviços" />
                        <NavLink href={dashboardLink} text={dashboardText} />
                        {session ? (
                            <SignOutButton />
                        ) : (
                            <Link
                                href="/signup"
                                className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg hover:bg-[var(--primary-light)] transition-colors font-medium"
                            >
                                Criar Conta
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <MenuButton
                            isOpen={isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        />
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4">
                        <div className="flex flex-col space-y-4">
                            {navLinks.map(link => (
                                <NavLink
                                    key={link.href}
                                    {...link}
                                    onClick={handleLinkClick}
                                />
                            ))}
                            <NavLink
                                href={dashboardLink}
                                text={dashboardText}
                                onClick={handleLinkClick}
                            />
                            {session ? (
                                <SignOutButton className="w-full" />
                            ) : (
                                <Link
                                    href="/signup"
                                    onClick={handleLinkClick}
                                    className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg hover:bg-[var(--primary-light)] transition-colors font-medium text-center"
                                >
                                    Criar Conta
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
} 