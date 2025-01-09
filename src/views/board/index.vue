<script setup>
import defaultProductImg from '@/assets/images/product_default.jpg'

defineOptions({
  name: 'boardPage'
})

import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useProductStore } from '@/stores/products'
import { useRouter } from 'vue-router'

const productStore = useProductStore()


const searchKeyword = ref('')
const showSuggestions = ref(false)

const isSearched = ref(false)


const router = useRouter()

const goToHome = () => {
  router.push('/home')
}

const searchSuggestions = computed(() => {
  if (!searchKeyword.value) return []

  return productStore.productList
    .filter(item =>
      item.name.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchKeyword.value.toLowerCase())
    )
    .slice(0, 5)
})

const handleSearchInput = (e) => {
  searchKeyword.value = e.target.value
  showSuggestions.value = true
}

const handleSuggestionClick = (item) => {
  searchKeyword.value = item.name
  showSuggestions.value = false
}


const handleSearch = () => {
  if (searchKeyword.value) {
    showSuggestions.value = false
    router.push({
      path: '/home',
      query: {
        keyword: searchKeyword.value
      }
    })
  }
}

const closeSearchSuggestions = (e) => {
  if (!searchKeyword.value && !e.target.closest('.top-wrapper')) {
    showSuggestions.value = false
  }
}

const closeAllOptions = () => {
  showOptions.value = {}
}

const showOptions = ref({})
onMounted(() => {
  document.addEventListener('click', closeAllOptions)
  document.addEventListener('click', closeSearchSuggestions)
})

onUnmounted(() => {
  document.removeEventListener('click', closeAllOptions)
  document.removeEventListener('click', closeSearchSuggestions)
})

const searchInputRef = ref(null)

const handleSearchIconClick = () => {
  if (!isSearched.value) {
    isSearched.value = true
    nextTick(() => {
      searchInputRef.value.focus()
    })
  }
}

const handleInputBlur = () => {
  setTimeout(() => {
    if (!searchKeyword.value) {
      showSuggestions.value = false
      isSearched.value = false
      searchInputRef.value.value = ''
    }
  }, 200)
}


const proList = [
  { id: 1, proUrl: defaultProductImg },
  { id: 2, proUrl: defaultProductImg },
  { id: 3, proUrl: defaultProductImg },
  { id: 4, proUrl: defaultProductImg },
  { id: 5, proUrl: defaultProductImg },
  { id: 6, proUrl: defaultProductImg },
  { id: 7, proUrl: defaultProductImg },
  { id: 8, proUrl: defaultProductImg }
]
import desriName from '../../components/desriName.vue'
import systemSelect from '../../components/systemSelect.vue'

const activeTab = ref('OpenEuler')
const openEulerList = ([
  {
    id: 1, name: 'OpenEuler 24.03 SPI', content: 'xxxxx'
  },
  {
    id: 2, name: 'OpenEuler 24.03 SPI', content: 'xxxxx'
  },
  {
    id: 3, name: 'OpenEuler 24.03 SPI', content: 'xxxxx'
  },
  {
    id: 4, name: 'OpenEuler 24.03 SPI', content: 'xxxxx'
  },
  {
    id: 5, name: 'OpenEuler 24.03 SPI', content: 'xxxxx'
  }
]
)
const eulerIndex = ref(0)

const handleUpdateIndex = (newIndex) => {
  if (newIndex >= 0 && newIndex < openEulerList.length) {
    eulerIndex.value = newIndex
  }
}


watch(() => eulerIndex.value, (newIndex) => {
  console.log('eulerIndex changed:', newIndex)
  console.log('Current openEulerItem:', openEulerList[newIndex])
})
</script>

<template>
  <div class="top-wrapper">
    <div class="top-bar">
      <div class="circle-img">
        <img src="@/assets/logo/Frame 1@3x.svg" alt="logo" />
      </div>
      <div class="back-to-home" v-show="!isSearched" @click="goToHome">
        <div class="back">
          <img src="../../assets/icons/board/Frame.png" alt="">
        </div>
        <div>回首页</div>
      </div>
      <div id="search" :class="{ 'active': isSearched }">
        <input type="text" class="search-input" v-model="searchKeyword" @input="handleSearchInput" placeholder='说点什么吧'
          @blur="handleInputBlur" ref="searchInputRef" v-show="isSearched" />
        <div :class="['search-img', { 'search-button': searchKeyword }]"
          @click="searchKeyword ? handleSearch() : handleSearchIconClick()">
          <img v-if="!searchKeyword" src="@/assets/icons/home/Group 2.png" alt="" />
          <button v-else class="search-text" type="button">搜 索</button>
        </div>
        <div v-if="showSuggestions && searchSuggestions.length > 0" class="search-suggestions">
          <div v-for="item in searchSuggestions" :key="item.id" class="suggestion-item"
            @click="handleSuggestionClick(item)">
            <div class="suggestion-content">
              <div class="suggestion-name">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  <div class="info">
    <!-- 左侧图像 -->
    <div class="picture">
      <!-- 大图 -->
      <div class="screen">
        <img src="../../assets/images/product_default.jpg" alt="">
      </div>
      <!-- 小图预览 -->
      <div class="preview">
        <div class="pre-item" v-for="item in proList" :key="item.id">
          <img :src="item.proUrl" alt="">
        </div>
      </div>
    </div>
    <!-- 右侧描述 -->
    <div class="descri">
      <!-- 板卡信息 -->
      <div class="board-info">
        <desriName name="板卡信息"></desriName>
        <div class="info-detail">
          <div id="board-block">
            <div id="title">厂商名称：</div>
            <div id="content">最多十六个字展示</div>
          </div>
          <div id="board-block">
            <div id="title">Soc型号称：</div>
            <div id="content">三十二个字符内</div>
          </div>
          <div id="board-block">
            <div id="title">板卡类型:</div>
            <div id="content">SOM+CAEEIER</div>
          </div>
        </div>
      </div>
      <!-- ram配置 -->
      <div class="ram">
        <desriName name="RAM配置">

        </desriName>
        <div id="content">DDRx@xxxHz,4GB/8GB/16GB</div>
      </div>
      <!-- 接口 -->
      <div class="port">
        <div id="board-block">
          <desriName name="存储接口"></desriName>
          <ul id="content" class="port-list">
            <li>￮ SPI NOR-Flash@xxxMBits</li>
            <li>￮ SDHC/SDXC 2.0 x1</li>
            <li>￮ SATA 3.0 x2</li>
            <li>￮ NVME M.2 x2</li>
            <li>￮ eMMC 4.0 512MB/4GB/32GB x1</li>
          </ul>

        </div>
        <div id="board-block">
          <desriName name="高速接口"></desriName>
          <ul id="content" class="port-list">
            <li>￮ SPI NOR-Flash@xxxMBits</li>
            <li>￮ SDHC/SDXC 2.0 x1</li>
            <li>￮ SATA 3.0 x2</li>
            <li>￮ NVME M.2 x2</li>
            <li>￮ eMMC 4.0 512MB/4GB/32GB x1</li>
          </ul>
        </div>
        <div id="board-block">
          <desriName name="显示接口"></desriName>
          <ul id="content" class="port-list">
            <li>￮ SPI NOR-Flash@xxxMBits</li>
            <li>￮ SDHC/SDXC 2.0 x1</li>
            <li>￮ SATA 3.0 x2</li>
            <li>￮ NVME M.2 x2</li>
            <li>￮ eMMC 4.0 512MB/4GB/32GB x1</li>
          </ul>
        </div>
        <div id="board-block">
          <desriName name="低速接口"></desriName>
          <ul id="content" class="port-list">
            <li>￮ SPI NOR-Flash@xxxMBits</li>
          </ul>
        </div>
      </div>

    </div>
  </div>
  <!-- 添加 tab 栏 -->
  <div class="system-tabs">
    <div class="tab-item" :class="{ active: activeTab === 'OpenEuler' }" @click="activeTab = 'OpenEuler'">
      OpenEuler
    </div>
    <div class="tab-item" :class="{ active: activeTab === 'OpenRegular' }" @click="activeTab = 'OpenRegular'">
      OpenRegular
    </div>
  </div>
  <systemSelect :openEulerItem="openEulerList[eulerIndex]" :openEulerList="openEulerList"
    @update-index="handleUpdateIndex"></systemSelect>
</template>

<style scoped lang="scss">
@use "sass:color" as color;


$primary-blue: #012fa6;
$secondary-blue: #4A77CA;
$light-blue: #789edb;
$border-color: #f1faff;


.top-wrapper {
  display: flex;
  justify-content: center;
  position: relative;


  .top-bar {
    margin: 0.8rem auto;
    width: 39.5rem;
    height: 3rem;
    border-radius: 0.75rem;
    border-color: #f5fbfe;
    border: 1px solid #f1faff;
    ;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #FFFFFF;
    transition: all 0.3s ease;
    position: relative;
    box-sizing: border-box;
    z-index: 1000;
    padding-right: 0.33rem;
    box-sizing: border-box;
    box-shadow: 0rem 0.09rem 0.07rem 0rem rgba(1, 47, 166, 0.02),
      0rem 0.21rem 0.17rem 0rem rgba(1, 47, 166, 0.03),
      0rem 0.39rem 0.31rem 0rem rgba(1, 47, 166, 0.04),
      0rem 0.7rem 0.56rem 0rem rgba(1, 47, 166, 0.04);

    .circle-img {
      width: 7rem;
      height: 1.97rem;
      display: flex;
      align-items: center;
      padding: 0.25rem 0 0.25rem 0.5rem;

      img {
        width: 5rem;
        height: 1.5rem;
        object-fit: contain;
        margin-left: 0.5rem;
      }
    }

    .back-to-home {
      display: flex;
      align-items: center;
      font-size: 0.94rem;
      width: 4rem;
      justify-content: space-between;
      margin-right: auto;

      img {
        width: 1rem;
        height: 1rem;
      }
    }

    #search {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: transparent;
      transition: all 0.3s ease;
      width: 19.22rem;
      height: 2rem;
      border-radius: 0.66rem;
      padding: 0 0.5rem;
      box-sizing: border-box;
      position: relative;

      &.active {
        background-color: #f0f0f0;
      }

      .back-to-home {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        color: $light-blue;
        font-size: 0.5rem;
        font-family: PingFang SC-Regular;
        margin-left: 1rem;

        &:hover {
          color: $primary-blue;
        }
      }

      &:focus-within {
        width: 19.22rem;

        .search-input {
          pointer-events: none;

          &::placeholder {
            color: $light-blue;
            content: "说点什么吧";
          }

          &:focus {
            pointer-events: auto;
          }
        }
      }

      .search-input {
        font-family: PingFang SC-Regular;
        color: $light-blue;
        width: 100%;
        border: none;
        font-size: 0.5rem;
        outline: none;
        padding: 0 0.25rem;
        background-color: transparent;
        box-sizing: border-box;

        &::placeholder {
          color: transparent;
          opacity: 0.8;
          font-size: 0.5rem;
        }
      }
      .search-img {
        width: 1.75rem;
        height: 1.75rem;
        padding: 0.25rem 0.63rem 0.24rem 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        margin-left: auto;

        &.search-button {
          background: $primary-blue;
          border-radius: 0.38rem;
          margin-right: 0.5rem;
          padding: 0;
          cursor: pointer;
          width: auto;
          min-width: 2.97rem;
          height: 1.34rem;
          font-size: 0.63rem;
          text-align: center;

          &:hover {
            background: color.scale($primary-blue, $lightness: -5%);
          }

          .search-text {
            width: 100%;
            height: 100%;
            color: #FFFFFF;
            background: none;
            border: none;
            cursor: pointer;
            font-family: PingFang SC-Regular;
            white-space: nowrap;
            font-size: inherit;

            &:focus {
              outline: none;
            }
          }
        }
      }
      .search-suggestions {
        position: absolute;
        top: 85%;
        left: 0;
        width: 100%;
        margin-top: 0.5rem;
        background: #FFFFFF;
        border-radius: 0.63rem;
        box-shadow: 0rem 0.09rem 0.07rem 0rem rgba(1, 47, 166, 0.02),
          0rem 0.21rem 0.17rem 0rem rgba(1, 47, 166, 0.03),
          0rem 0.39rem 0.31rem 0rem rgba(1, 47, 166, 0.04),
          0rem 0.7rem 0.56rem 0rem rgba(1, 47, 166, 0.04);
        padding: 0.5rem;
        box-sizing: border-box;
        border: 0.13rem solid #CCCCCC;
        z-index: 1001;

        .suggestion-item {
          display: flex;
          align-items: center;
          height: 1.19rem;
          padding: 0 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 0.38rem;
          box-sizing: border-box;

          &:hover {
            background: rgba(1, 47, 166, 0.1);
          }

          .suggestion-content {
            flex: 1;
            overflow: hidden;
            white-space: nowrap;

            .suggestion-name {
              font-size: 0.5rem;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }

          &.selected {
            background: rgba(1, 47, 166, 0.1);
            border-radius: 0.31rem;
          }
        }
      }
    }
  }

}

.info {
  width: 39.5rem;
  display: flex;

  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0rem 0.09rem 0.07rem 0rem rgba(1, 47, 166, 0.02), 0rem 0.21rem 0.17rem 0rem rgba(1, 47, 166, 0.03), 0rem 0.39rem 0.31rem 0rem rgba(1, 47, 166, 0.04), 0rem 0.7rem 0.56rem 0rem rgba(1, 47, 166, 0.04);
  border-radius: 0.63rem;
  border: 1px solid #f1faff;
  ;

  .picture {
    flex: 2;
    width: 10rem;
    padding: 0.63rem 0 0.63rem 0.63rem;

    .screen {
      width: 9.11rem;
      height: 12.03rem;

      img {
        border-radius: 0.2rem;
      }
    }

    .preview {
      display: flex;
      flex-wrap: wrap;
      gap: 0.16rem;
      margin-top: 0.44rem;

      .pre-item {
        width: 1.69rem;
        height: 1.02rem;
        overflow: hidden;
        border-radius: 0.1rem;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      }
    }
  }

  .descri {
    flex: 8;
    padding: 0.63rem;
    height: 100%;

    .info-detail {
      display: flex;
      justify-content: space-between;
      margin-top: 0.38rem;




    }

    .port {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
}

#title {
  font-size: 0.44rem;
  color: rgba(102, 102, 102, 1)
}

#content {
  font-size:
    0.47rem;
  margin-top: 0.13rem;
  color: #333;

  li {
    margin-top: 0.3rem;
  }
}

#board-block {
  width: 9.09rem;
}

.system-tabs {
  display: flex;
  gap: 1rem;
  margin: 1.25rem 0 1rem 1.5rem;


  .tab-item {
    padding: 0.5rem 1rem;
    font-size: 0.88rem;
    color: #666;
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;

    &.active {
      color: $primary-blue;
      font-weight: 500;

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 50%;
        transform: translateX(-50%);
        width: 2rem;
        height: 2px;
        background: $primary-blue;
      }
    }

    &:hover {
      color: $primary-blue;
    }
  }
}

.system-select {
  width: 39.5rem;
  margin: 1rem auto;
  box-sizing: border-box;
  background: #FFFFFF;
  border-radius: 0.63rem;
  border: 1px solid #f1faff;
  box-shadow: 0rem 0.09rem 0.07rem 0rem rgba(1, 47, 166, 0.02),
    0rem 0.21rem 0.17rem 0rem rgba(1, 47, 166, 0.03),
    0rem 0.39rem 0.31rem 0rem rgba(1, 47, 166, 0.04),
    0rem 0.7rem 0.56rem 0rem rgba(1, 47, 166, 0.04);
  padding: 1rem;



  .select-title {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    .title-text {
      font-size: 0.88rem;
      color: #333;
      font-weight: 500;
      margin-right: 0.5rem;
    }

    .title-line {
      flex: 1;
      height: 1px;
      background: #E5E5E5;
    }
  }

  .select-content {
    .select-drop {
      display: flex;
      width: 14.5rem;
      justify-content: space-between;

      .select-row {




        .select-label {
          width: 4rem;
          font-size: 0.44rem;
          color: #666;
        }

        .select-box {
          position: relative;
          display: flex;
          align-items: center;
          margin-top: 0.3rem;

          .select-wrapper {
            position: relative;
            display: flex;
            align-items: center;
          }

          .kernel-tag {
            position: absolute;
            right: 2.5rem;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(1, 47, 166, 0.8);
            color: white;
            font-size: 0.34rem;
            padding: 0.13rem 0.25rem;
            border-radius: 0.13rem;

          }

          select {
            width: 7rem;
            height: 1.03rem;
            border: 1px solid #E5E5E5;
            border-radius: 0.25rem;
            padding: 0 4rem 0 0.5rem;
            font-size: 0.47rem;
            color: #333;
            outline: none;
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            background: transparent;
            box-sizing: border-box;
            cursor: pointer;

            &:focus {
              border-color: $secondary-blue;
            }
          }

          .dropdown-icon {
            position: absolute;
            right: 0.5rem;
            top: 50%;
            transform: translateY(-50%);
            width: 0.6rem;
            height: 0.6rem;
            pointer-events: none;
          }
        }
      }
    }

    .file-list {
      margin-top: 0.5rem;
      max-height: 8.5rem;
      overflow-y: auto; 
      padding-right: 0.5rem; 
      &::-webkit-scrollbar {
        width: 0.25rem; 
      }

      &::-webkit-scrollbar-track {
        background: transparent; 
      }

      &::-webkit-scrollbar-thumb {
        background: #e5e5e5; 
        border-radius: 0.125rem; 
      }

      .file-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #f5f5f5;
        margin-top: 0.2rem;
        border-radius: 0.2rem;
        padding: 0.4rem 0.6rem;
        box-sizing: border-box;
        font-size: 0.47rem;

        &:first-child {
          margin-top: 0; 
        }

        .file-name {
          font-size: 0.47rem;
          color: #333;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .file-size {
          font-size: 0.75rem;
          color: #666;
          margin-left: 1rem;
        }
      }
    }

    .button-area {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;

      .pagination {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;

        button {
          width: 1.75rem;
          height: 1.25rem;
          border: 0.05rem solid $primary-blue;
          border-radius: 0.25rem;
          background: #FFFFFF;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.2rem;
          color: $primary-blue;
          font-size: 1rem;
          font-weight: 600;

          &:hover {
            border-color: $secondary-blue;
            color: $secondary-blue;
          }
        }
      }

      .help-btn {
        margin-top: 0.1rem;

        .btn-border {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 5.63rem;
          height: 1.25rem;
          border: 0.05rem solid $primary-blue;
          border-radius: 0.31rem;
          color: $primary-blue;
          font-size: 0.63rem;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            background: rgba(1, 47, 166, 0.1);
          }
        }
      }
    }
  }
}
</style>
