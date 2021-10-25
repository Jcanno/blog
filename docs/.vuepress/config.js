module.exports = {
  title: '前端体系',
  description: '构建前端体系',
  base: '/blog/',
  dest: 'dist',
	themeConfig: {
    repo: 'Jcanno/blog',
    editLinks: true,
    docsDir: 'docs',
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新',
		sidebar: [
      {
        title: 'JS基础',
        collapsable: true,
        children: [
          '/js/context',
          '/js/prototype',
          '/js/extend',
          '/js/promise'
        ]
      },
      {
        title: 'DOM',
        collapsable: true,
        children: [
          '/dom/event'
        ]
			},
			{
        title: 'CSS',
        collapsable: false,
        children: [
        ]
			},
			{
        title: '工程化',
        collapsable: false,
        children: [
        ]
			},
			{
        title: '性能优化',
        collapsable: false,
        children: [
        ]
			},
			{
        title: '网络协议',
        collapsable: false,
        children: [
          'net/history',
          'net/domain',
          'net/uri',
          'net/status',
          'net/connection',
          'net/context-header',
          'net/request',
          'net/negotiate',
          'net/https',
          'net/http2',
          'net/http3'
        ]
			},
			{
        title: '浏览器原理',
        collapsable: false,
        children: [
        ]
      },
      {
        title: '手写JS方法',
        collapsable: false,
        children: [
        ]
      },
      {
        title: '算法',
        collapsable: true,
        children: [
          'math/stack',
          'math/queue',
          'math/deque',
          'math/linkedList',
          'math/doubleLinkedList',
          'math/sort',
          'math/fibonaic',
          'math/deep'
        ]
      },
		]
	}
}
