'use client'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-[var(--primary)] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-8 lg:py-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {/* Company Info */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-bold text-white relative inline-block">
                                VetPay
                            </h3>
                            <p className="text-white/80 leading-relaxed">
                                Atendimento veterinário profissional ao seu alcance
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-3">
                            <h4 className="text-lg font-semibold text-white">
                                Links Rápidos
                            </h4>
                            <ul className="space-y-2">
                                {[
                                    { href: "/", text: "Início" },
                                    { href: "/services", text: "Serviços" },
                                    { href: "/about", text: "Sobre Nós" },
                                    { href: "/blog", text: "Blog" }
                                ].map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-white/80 hover:text-white transition-colors duration-200 flex items-center group"
                                        >
                                            <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                                                {link.text}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div className="space-y-3">
                            <h4 className="text-lg font-semibold text-white">
                                Serviços
                            </h4>
                            <ul className="space-y-2">
                                {[
                                    { href: "/services#video", text: "Consulta por Vídeo" },
                                    { href: "/services#chat", text: "Suporte por Chat" },
                                    { href: "/services#emergency", text: "Atendimento de Emergência" },
                                    { href: "/services#followup", text: "Acompanhamento" }
                                ].map((service) => (
                                    <li key={service.href}>
                                        <Link
                                            href={service.href}
                                            className="text-white/80 hover:text-white transition-colors duration-200 flex items-center group"
                                        >
                                            <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                                                {service.text}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <h4 className="text-lg font-semibold text-white">
                                Contato
                            </h4>
                            <ul className="space-y-2">
                                <li className="text-white/80 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    contato@vetpay.com.br
                                </li>
                                <li>
                                    <a
                                        href="https://wa.me/5571991916499"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/80 hover:text-white transition-colors duration-200 flex items-center group"
                                    >
                                        <svg className="w-5 h-5 mr-2 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                                            +55 71 99191-6499
                                        </span>
                                    </a>
                                </li>
                                <li className="text-white/80 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Disponível 24/7
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="border-t border-white/10 py-4">
                    <div className="text-center">
                        <p className="text-white/80 text-sm">
                            &copy; {new Date().getFullYear()} VetPay. Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
} 