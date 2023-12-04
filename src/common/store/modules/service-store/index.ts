import { getSceneList } from '@/common/http/api/common'
import { getPageSceneTags } from '@/api/scene'

export default {
  namespaced: true,
  state: () => ({
    scene: null,
    tags: null,
  }),
  mutations: {
    setScene(state: any, data: any) {
      state.scene = data
    },
    setTags(state: any, data: any) {
      state.tags = data
    },
  },
  actions: {
    loadScene({ state, commit }: any) {
      return new Promise((resolve) => {
        const { scene } = state
        if (scene) {
          resolve(scene)
        } else {
          getSceneList().then((data: any) => {
            commit('setScene', data)
            resolve(data)
          })
        }
      })
    },
    loadTags({
      state,
      commit,
    }: // commit
    any) {
      return new Promise((resolve) => {
        const { tags } = state
        if (tags) {
          resolve(tags)
        } else {
          const subData = {
            pageNumber: 0,
            pageSize: 1000,
          }
          getPageSceneTags(subData).then((data: any) => {
            const { content } = data
            commit('setTags', content)
            resolve(content)
          })
        }
      })
    },
  },
}
