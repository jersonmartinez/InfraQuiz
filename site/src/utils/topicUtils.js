export const getTopicName = (topicId) => {
    const topics = {
        bash: 'Bash Scripting',
        docker: 'Docker',
        kubernetes: 'Kubernetes',
        terraform: 'Terraform',
        ansible: 'Ansible',
        aws: 'AWS Cloud',
        cicd: 'CI/CD',
        github: 'GitHub',
        databases: 'Databases',
        security: 'DevSecOps',
        python: 'Python Ops',
        monitoring: 'Monitoring',
        networking: 'Networking',
        mixed: 'Mixed Topics'
    };
    return topics[topicId] || topicId;
};

export const getTopicEmoji = (topicId) => {
    const emojis = {
        bash: '🐚',
        docker: '🐳',
        kubernetes: '☸️',
        terraform: '💠',
        ansible: '📜',
        aws: '☁️',
        cicd: '🔄',
        github: '🐙',
        databases: '💾',
        security: '🔒',
        python: '🐍',
        monitoring: '📊',
        networking: '🌐',
        mixed: '🎯'
    };
    return emojis[topicId] || '📝';
};
