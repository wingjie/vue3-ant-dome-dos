// import Layout from '@/layout/index.vue'

export default {
  path: '/readme',
  name: 'Readme',
  meta: { title: '文档' },
  component: () => import('@/layout/index.vue'),
  redirect: '/readme/index',
  children: [
    {
      path: 'form',
      name: 'form',
      meta: { title: 'SForm' },
      component: () => import('@/views/sform/index.vue'),
    },
    {
      path: 'table',
      name: 'table',
      meta: { title: 'STable' },
      component: () => import('@/views/stable/index.vue'),
    },
    {
      path: 'sMultiLine',
      name: 'SMultiLine',
      meta: { title: 'SMultiLine' },
      component: () => import('@/views/sMultiLine/index.vue'),
    },
    {
      path: 'codeEditors',
      name: 'codeEditors',
      meta: { title: 'codeEditors' },
      component: () => import('@/views/codeEditors/index.vue'),
    },
    {
      path: 'icon',
      name: 'icon',
      meta: { title: 'Icon' },
      component: () => import('@/views/icon/index.vue'),
    },
    {
      path: 'button',
      name: 'button',
      meta: { title: 'Button' },
      component: () => import('@/views/button/index.vue'),
    },
    {
      path: 'sSearchForm',
      name: 'SSearchForm',
      meta: { title: 'SSearchForm' },
      component: () => import('@/views/SSearchForm/index.vue'),
    },
    {
      path: 'validate',
      name: 'validate',
      meta: { title: '校验' },
      component: () => import('@/views/validate/index.vue'),
    },
    {
      path: 'x6',
      name: 'x6',
      meta: { title: 'X6' },
      component: () => import('@/views/x6/index.vue'),
    },
    {
      path: 'hook',
      name: 'hook',
      meta: { title: 'hook' },
      component: () => import('@/views/hook/index.vue'),
    },
    {
      path: 'jsonSchema',
      name: 'jsonSchema',
      meta: { title: 'jsonSchema' },
      component: () => import('@/views/jsonSchema/index.vue'),
    },
  ],
}
