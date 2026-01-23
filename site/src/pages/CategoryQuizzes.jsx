import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import {
    Server, Cloud, Code, Database, Shield, GitBranch,
    Activity, Network, Layers, Workflow, Box, Terminal, ArrowRight
} from 'lucide-react';

const TerminalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
);

// Category mappings - TODOS los temas disponibles
const CATEGORY_GROUPS = {
    iac: {
        name: 'Infrastructure as Code',
        icon: Server,
        color: 'blue',
        topics: ['terraform', 'ansible'],
    },
    cloud: {
        name: 'Cloud Platforms',
        icon: Cloud,
        color: 'purple',
        topics: ['aws'],
    },
    containers: {
        name: 'Containerization',
        icon: Code,
        color: 'green',
        topics: ['docker', 'kubernetes'],
    },
    scripting: {
        name: 'Scripting & Automation',
        icon: Terminal,
        color: 'yellow',
        topics: ['bash', 'python'],
    },
    devops: {
        name: 'DevOps Tools',
        icon: Workflow,
        color: 'cyan',
        topics: ['cicd', 'github', 'monitoring'],
    },
    infrastructure: {
        name: 'Infrastructure & Security',
        icon: Shield,
        color: 'red',
        topics: ['databases', 'networking', 'security'],
    },
    mixed: {
        name: 'Mixed Topics',
        icon: Layers,
        color: 'violet',
        topics: ['mixed'],
    },
};

const TOPIC_INFO = {
    terraform: { name: 'Terraform', icon: Server, color: 'text-purple-400', desc: 'Infrastructure as Code' },
    ansible: { name: 'Ansible', icon: Workflow, color: 'text-red-400', desc: 'Configuration Management' },
    docker: { name: 'Docker', icon: Box, color: 'text-blue-400', desc: 'Containerization' },
    kubernetes: { name: 'Kubernetes', icon: Cloud, color: 'text-blue-500', desc: 'Orchestration' },
    aws: { name: 'AWS', icon: Cloud, color: 'text-orange-400', desc: 'Cloud Provider' },
    bash: { name: 'Bash', icon: TerminalIcon, color: 'text-green-400', desc: 'Shell Scripting' },
    python: { name: 'Python', icon: Code, color: 'text-yellow-400', desc: 'Automation & Scripting' },
    cicd: { name: 'CI/CD', icon: GitBranch, color: 'text-green-400', desc: 'Continuous Integration' },
    github: { name: 'GitHub', icon: GitBranch, color: 'text-gray-400', desc: 'Version Control' },
    monitoring: { name: 'Monitoring', icon: Activity, color: 'text-pink-400', desc: 'Observability' },
    databases: { name: 'Databases', icon: Database, color: 'text-cyan-400', desc: 'SQL & NoSQL' },
    networking: { name: 'Networking', icon: Network, color: 'text-indigo-400', desc: 'Network Fundamentals' },
    security: { name: 'Security', icon: Shield, color: 'text-red-500', desc: 'Security Best Practices' },
    mixed: { name: 'Mixed Topics', icon: Layers, color: 'text-violet-400', desc: 'DevOps Mix' },
};

const CategoryQuizzes = () => {
    const { category } = useParams();
    const categoryData = CATEGORY_GROUPS[category];

    if (!categoryData) {
        return (
            <div className="min-h-screen pt-24 px-6 pb-12">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">Category Not Found</h2>
                    <Link to="/" className="text-blue-400 hover:text-blue-300">
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    const Icon = categoryData.icon;

    return (
        <div className="min-h-screen pt-24 px-6 pb-12">
            <div className="max-w-6xl mx-auto">
                <Breadcrumb
                    items={[
                        { label: 'All Topics', href: '/quiz' },
                        { label: categoryData.name }
                    ]}
                />

                {/* Category Header */}
                <div className="glass-panel p-8 rounded-2xl mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`p-4 rounded-xl bg-${categoryData.color}-500/10`}>
                            <Icon className={`w-8 h-8 text-${categoryData.color}-400`} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">{categoryData.name}</h1>
                            <p className="text-gray-400">{categoryData.topics.length} quiz topics available</p>
                        </div>
                    </div>
                </div>

                {/* Topics Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryData.topics.map((topicId) => {
                        const topic = TOPIC_INFO[topicId];
                        if (!topic) return null;

                        const TopicIcon = topic.icon;

                        return (
                            <div key={topicId} className="glass-panel p-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-blue-500/30 transition-all group flex flex-col">
                                <div className="mb-4 p-3 rounded-lg bg-white/5 w-fit">
                                    {typeof TopicIcon === 'function' && topicId === 'bash' ? (
                                        <TopicIcon />
                                    ) : (
                                        <TopicIcon className={`w-8 h-8 ${topic.color}`} />
                                    )}
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{topic.name}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow">{topic.desc}</p>

                                <div className="space-y-3">
                                    <Link
                                        to={`/quiz/${topicId}`}
                                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2"
                                    >
                                        Start Quiz <ArrowRight size={16} />
                                    </Link>
                                    <Link
                                        to={`/quiz/${topicId}?mode=study`}
                                        className="w-full py-2 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-blue-500 flex items-center justify-center gap-1 transition-colors"
                                    >
                                        <Box size={14} />
                                        Reference Guide
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CategoryQuizzes;
