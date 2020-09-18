module.exports = {
  title: '前端体系',
	description: '构建前端体系',
	themeConfig: {
    repo: 'Jcanno/blog',
    editLinks: true,
    docsDir: 'docs',
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新',
		sidebar: [
      {
        title: 'JS基础',
        collapsable: false,
        children: [
          '/js/context',
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
        ]
			},
			{
        title: '浏览器原理',
        collapsable: false,
        children: [
        ]
      },
		]
	}
}
