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
          '/dom/event',
          '/dom/script-position'
        ]
			},
			{
        title: 'CSS',
        collapsable: true,
        children: [
        ]
			},
			{
        title: '工程化',
        collapsable: true,
        children: [
        ]
			},
			{
        title: '网络协议',
        collapsable: true,
        children: [
          'net/history',
          'net/domain',
          'net/uri',
          'net/body',
          'net/file',
          'net/status',
          'net/connection',
          'net/context-header',
          'net/request',
          'net/negotiate',
          'net/cookie',
          'net/same-origin',
          'net/cache',
          'net/https',
          'net/http2',
          'net/http3'
        ]
			},
      {
        title: '手写JS方法',
        collapsable: true,
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
