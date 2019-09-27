export const sidebarData = [
    {
        key: '1',
        text: '工作',
        type: 'desktop',
        path: '/home'
    },
    {
        key: '2',
        text: '生活',
        type: 'smile',
        path: '/life'
    },
    {
        key: '3',
        text: '概要',
        type: 'highlight',
        path: '/record'
    }
];

export const groupKey = sidebarData.map(item => item.key);