import { defineStore } from 'pinia'
import defaultProductImg from '@/assets/images/product_default.jpg'

export const useProductStore = defineStore('products', {
  state: () => ({
    productList: [
      {
        id: 1,
        tag: "内核同源",
        imgUrl: defaultProductImg,
        name: '产品名称B',
        description: '2025新年大吉 包你发财 新年行大运嘻嘻 嘻嘻嘻嘻嘻嘻嘻嘻嘻'
      },
      {
        id: 2,
        tag: "内核同源",
        imgUrl: defaultProductImg,
        name: '产品名称CCC',
        description: '2025新年大吉 包你发财 新年行大运嘻嘻 嘻嘻嘻嘻嘻嘻嘻嘻嘻'
      },
      {
        id: 3,
        tag: "内核同源",
        imgUrl: defaultProductImg,
        name: '产品名称AAA',
        description: '2025新年大吉 包你发财 新年行大运嘻嘻 嘻嘻嘻嘻嘻嘻嘻嘻嘻'
      },
      {
        id: 4,
        tag: "内核同源",
        imgUrl: defaultProductImg,
        name: '产品名称DDD',
        description: '高性能计算解决方案，提供卓越的运算能力'
      },
      {
        id: 5,
        imgUrl: defaultProductImg,
        name: '产品名称EEE',
        description: '智能化系统管理工具，简化运维工作'
      },
      {
        id: 6,
        tag: "内核同源",
        imgUrl: defaultProductImg,
        name: '产品名称FFF',
        description: '全方位系统安全防护，保障数据安全'
      },
      {
        id: 7,
        imgUrl: defaultProductImg,
        name: '产品名称GGG',
        description: '新一代云计算平台，助力数字化转型'
      },
      {
        id: 8,
        tag: "内核同源",
        imgUrl: defaultProductImg,
        name: '产品名称HHH',
        description: '分布式存储解决方案，高效可靠'
      },
      {
        id: 9,
        imgUrl: defaultProductImg,
        name: '产品名称III',
        description: '智能网络管理系统，实时监控优化'
      },
      {
        id: 10,
        tag: "内核同源",
        imgUrl: defaultProductImg,
        name: '产品名称JJJ',
        description: '容器化部署平台，灵活扩展'
      },
      {
        id: 11,
        imgUrl: defaultProductImg,
        name: '产品名称KKK',
        description: '微服务架构支持，简化开发部署'
      },
      {
        id: 12,
        tag: "内核同源",
        imgUrl: defaultProductImg,
        name: '产品名称LLL',
        description: '企业级安全解决方案，全面防护'
      },
      {
        id: 13,
        imgUrl: defaultProductImg,
        name: '产品名称MMM',
        description: '大数据分析平台，深度洞察'
      },
      {
        id: 14,
        tag: "内核同源",
        imgUrl: defaultProductImg,
        name: '产品名称NNN',
        description: '人工智能开发框架，快速落地'
      },
      {
        id: 15,
        imgUrl: defaultProductImg,
        name: '产品名称OOO',
        description: '边缘计算解决方案，实时处理'
      },
      {
        id: 16,
        tag: "内核同源",
        imgUrl: defaultProductImg,
        name: '产品名称PPP',
        description: '混合云管理平台，统一调度'
      },
      {
        id: 17,
        imgUrl: defaultProductImg,
        name: '产品名称QQQ',
        description: '自动化运维工具，提升效率'
      },
      {
        id: 18,
        tag: "内核同源",
        imgUrl: defaultProductImg,
        name: '产品名称RRR',
        description: '数据加密解决方案，安全可靠'
      },
      {
        id: 19,
        imgUrl: defaultProductImg,
        name: '产品名称SSS',
        description: '负载均衡系统，性能优化'
      },
      {
        id: 20,
        tag: "内核同源",
        imgUrl: defaultProductImg,
        name: '产品名称TTT',
        description: '高可用集群方案，稳定运行'
      },
      {
        id: 21,
        imgUrl: defaultProductImg,
        name: '产品名称UUU',
        description: '分布式缓存系统，高速访问'
      },
      {
        id: 22,
        tag: "内核同源",
        imgUrl: defaultProductImg,
        name: '产品名称VVV',
        description: '微服务治理平台，统一管理'
      },
      {
        id: 23,
        imgUrl: defaultProductImg,
        name: '产品名称WWW',
        description: '容器编排系统，灵活部署'
      },
      {
        id: 24,
        tag: "内核同源",
        imgUrl: defaultProductImg,
        name: '产品名称XXX',
        description: '身份认证系统，安全可控'
      },
      {
        id: 25,
        imgUrl: defaultProductImg,
        name: '产品名称YYY',
        description: '日志分析平台，问题追踪'
      },
      {
        id: 26,
        tag: "内核同源",
        imgUrl: defaultProductImg,
        name: '产品名称ZZZ',
        description: '应用性能监控，实时优化'
      },
      {
        id: 27,
        imgUrl: defaultProductImg,
        name: '产品名称ABC',
        description: '数据备份方案，安全保障'
      },
      {
        id: 28,
        tag: "内核同源",
        imgUrl: defaultProductImg,
        name: '产品名称DEF',
        description: '云原生应用平台，快速部署'
      },
      {
        id: 29,
        imgUrl: defaultProductImg,
        name: '产品名称GHI',
        description: '资源调度系统，智能分配'
      },
      {
        id: 30,
        tag: "内核同源",
        imgUrl: defaultProductImg,
        name: '产品名称JKL',
        description: '漏洞扫描工具，主动防御'
      }
    ]
  }),
  getters: {
    productCount: (state) => state.productList.length
  },
  actions: {
    addProduct(product) {
      this.productList.push(product)
    },
    removeProduct(id) {
      const index = this.productList.findIndex(p => p.id === id)
      if (index > -1) {
        this.productList.splice(index, 1)
      }
    }
  }
}) 