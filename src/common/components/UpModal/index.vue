<template>
  <a-modal
    class="up-modal"
    v-model:visible="visible"
    width="680px"
    title="导入"
    @ok="handleOk"
  >
    <!-- <nav style="padding-bottom: 10px">
      <slot name="header"></slot>
    </nav>
    <div style="display: flex">
      <div>
        <div style="width: 75px">上传附件：</div>
      </div>
      <div style="max-width: 350px">
        <a-upload
          v-model:file-list="fileList"
          :max-count="1"
          list-type="picture"
          :before-upload="beforeUpload"
        >
          <a-button>
            <i-ic-baseline-cloud-upload />
            上传文件
          </a-button>
        </a-upload>
        <div v-if="showDown" style="color: #bbb">
          <div>只接受本系统的导入数据模板</div>
          <div>
            下载导入模板请点击:
            <a-button type="link" @click="$emit('down')">模板下载</a-button>
          </div>
        </div>
      </div>
    </div> -->
    <div class="main">
      <div class="importBox" v-if="showDown">
        <SvgIcon name="tips-routine" font-size="20px" />
        <span style="margin-left: 5px">
          只接受本系统的导入数据模版，下载模版请点击：
        </span>
        <SButtonGroup
          class="link"
          type="link"
          @c="$emit('down')"
          :setup="{
            c: {
              text: '模板下载',
              attr: {
                style: { 'text-decoration': 'underline' },
              },
            },
          }"
        ></SButtonGroup>
      </div>
      <div class="upBox">
        <a-upload-dragger
          class="upload-dragger"
          v-model:file-list="fileList"
          :max-count="1"
          list-type="picture"
          :before-upload="beforeUpload"
        >
          <p class="upload-drag-icon">
            <SvgIcon name="icon-upload" fontSize="32px" />
          </p>
          <p class="upload-text">
            将文件拖拽至此区域，也可以
            <SButtonGroup
              type="link"
              @c="() => {}"
              :setup="{
                c: {
                  text: '点击上传',
                },
              }"
            ></SButtonGroup>
          </p>
          <!-- <p class="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p> -->
        </a-upload-dragger>
      </div>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import { message, Upload } from 'ant-design-vue'
//* *******************不用动部分*********************************//
interface propIn {
  doText?: string
  showDown?: boolean
  modelValue: boolean
  type?: Array<string> | string
}
const $emit = defineEmits(['update:modelValue', 'ok', 'down', 'downEx'])
const props = withDefaults(defineProps<propIn>(), {
  modelValue: false,
  type: undefined,
  showDown: true,
})
const { modelValue, type } = toRefs(props)
const visible = computed({
  get() {
    return modelValue.value
  },
  set(val) {
    $emit('update:modelValue', val)
  },
})
function handleOk() {
  console.log(fileList.value[0], 'fileList.value[0]')
  const file = fileList.value[0]
  console.log(file, 'file')
  const formData = new FormData()
  if (file) {
    formData.append('file', file.originFileObj)
    $emit('ok', fileList.value[0], formData)
  } else {
    $emit('ok', fileList.value[0])
  }
}
//* *******************不用动部分结束****************************//

const fileList = ref<any>([])

function beforeUpload(file: any) {
  if (type.value) {
    const arr = file.name.split('.')
    const fileType = arr[arr.length - 1]
    const is = type.value.includes(fileType)
    if (!is) {
      message.error(`${file.name}不是${type.value}格式`)
      return Upload.LIST_IGNORE
    }
  }
  fileList.value = [file]
  return false
}
watch(
  () => modelValue.value,
  () => {
    fileList.value = []
  }
)
</script>
<style lang="scss">
.up-modal {
  width: 300px;
  div[class*='modal-body'] {
    background: white;
    .importBox {
      width: 100%;
      height: 60px;
      background: #eef8ff;
      border-radius: 8px;
      display: flex;
      align-items: center;
      .link {
        span {
          text-decoration: underline;
        }
      }
    }
  }
  div[class*='upload-drag'].upload-dragger {
    height: 148px;
    margin-top: 16px;
    background: #fbfdfe;
    border-color: #dbe6f1;
    & > span {
      padding-top: 44px;
      .upload-drag-icon {
        margin-bottom: 11px;
      }
    }
  }
  div[class*='modal-footer'] {
    border-top: none;
    padding: 0 16px 18px;
  }
}
</style>
<style scoped lang="scss">
// .scroll {
//   padding-right: 3vw;
//   max-height: 55vh;
//   overflow-y: scroll;
// }
// :deep(.ant-upload-list) {
//   height: 80px;
// }

// :deep(.galaxy-modal-body) {
//   background-color: white !important;
// }
// .main {
//   background: white;
//   border: 1px solid pink;
// }
.importBox {
  width: 100%;
  height: 60px;
  background: #eef8ff;
  border-radius: 8px;
  display: flex;
  padding-left: 18px;
  align-items: center;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #262626;
}

.upload-drag-icon {
  display: flex;
  justify-content: center;
}
.upload-text {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
