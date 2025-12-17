import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ChevronRight, ArrowLeft } from 'lucide-react';

const Breadcrumb = ({ items, onBack }) => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between mb-8">
            {/* Breadcrumb Trail */}
            <nav className="flex items-center gap-2 text-sm">
                <Link
                    to="/"
                    className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                >
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                </Link>

                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                        {item.href ? (
                            <Link
                                to={item.href}
                                className="text-gray-400 hover:text-white transition-colors capitalize"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-white capitalize font-medium">
                                {item.label}
                            </span>
                        )}
                    </React.Fragment>
                ))}
            </nav>

            {/* Back Button */}
            <button
                onClick={onBack || (() => navigate(-1))}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
            </button>
        </div>
    );
};

export default Breadcrumb;
