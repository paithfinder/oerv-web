<script setup>
import ProductItem from '@/components/productItem.vue'
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useProductStore } from '@/stores/products'
import { useRoute } from 'vue-router'

defineOptions({
  name: 'homePage'
})

const productStore = useProductStore()

const route = useRoute()

const menuList = [
  {
    id: 1,
    name: "Soc型号",
    item: ["PENDING", "ONTSUPPORT", "WSUPPORTED", "DEPRECATED"]
  },
  { id: 2, name: "指令集特性", item: ["PENDING", "ONTSUPPORT", "WSUPPORTED", "DEPRECATED"] },
  { id: 3, name: "内核版本", item: ["PENDING", "ONTSUPPORT", "WSUPPORTED", "DEPRECATED"] },
  { id: 4, name: "OE用户态版本", item: ["PENDING", "ONTSUPPORT", "WSUPPORTED", "DEPRECATED"] },
  {
    id: 5,
    name: "支持状态",
    item: ["PENDING", "ONTSUPPORT", "WSUPPORTED", "DEPRECATED"]
  }
];


const selectedOptions = ref({})


const showOptions = ref({})


const isSticky = ref(false)


const showBackToTop = ref(false)


const searchKeyword = ref('')
const showSuggestions = ref(false)


const isSearched = ref(false)


const showSearchInput = ref(false)


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


const closeSearchSuggestions = (e) => {
  if (!e.target.closest('.search-container')) {
    showSuggestions.value = false
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}


const handleMenuClick = (menuId, event) => {

  event.stopPropagation()

  showOptions.value[menuId] = !showOptions.value[menuId]

  Object.keys(showOptions.value).forEach(key => {
    if (Number(key) !== menuId) {
      showOptions.value[key] = false
    }
  })
}


const handleOptionSelect = (menuId, option, event) => {

  event.stopPropagation()
  if (selectedOptions.value[menuId] === option) {
    delete selectedOptions.value[menuId]
  } else {
    selectedOptions.value[menuId] = option
  }

  showOptions.value[menuId] = false
}


const closeAllOptions = () => {
  showOptions.value = {}
}

onMounted(() => {
  document.addEventListener('click', closeAllOptions)
  document.addEventListener('click', closeSearchSuggestions)
})

onUnmounted(() => {
  document.removeEventListener('click', closeAllOptions)
  document.removeEventListener('click', closeSearchSuggestions)
})


const getMenuTitle = computed(() => (menuId) => {
  if (selectedOptions.value[menuId]) {
    return selectedOptions.value[menuId]
  }
  return menuList.find(item => item.id === menuId)?.name
})


onMounted(() => {
  const searchContainer = document.querySelector('.search-container')
  const searchInput = document.querySelector('.search-input')
  const originalPlaceholder = searchInput.placeholder

  const handleScroll = () => {

    showBackToTop.value = window.scrollY > 300

    if (window.scrollY > 0) {
      searchContainer.classList.add('sticky')
      searchInput.placeholder = ''
      isSticky.value = true
      if (!searchKeyword.value) {
        showSearchInput.value = false 
      }
    } else {
      searchContainer.classList.remove('sticky')
      searchInput.placeholder = originalPlaceholder
      isSticky.value = false
      showSearchInput.value = true 
    }
  }

  window.addEventListener('scroll', handleScroll)

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})


const filteredProductList = computed(() => {
  if (!isSearched.value) {
    return productStore.productList
  }

  if (!searchKeyword.value) {
    return []
  }

  const keyword = searchKeyword.value.toLowerCase()
  return productStore.productList.filter(product =>
    product.name.toLowerCase().includes(keyword) ||
    product.description.toLowerCase().includes(keyword)
  )
})


const handleSearch = () => {
  if (searchKeyword.value) {  
    showSuggestions.value = false
    isSearched.value = true
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}


const handleInputBlur = () => {
  if (isSticky.value) {
    setTimeout(() => {
      showSuggestions.value = false
      if (!searchKeyword.value) {
        const searchInput = document.querySelector('#search')
        showSearchInput.value = false 
         searchInput.style.backgroundColor = 'transparent'
      }
    }, 200)
  }
}


const searchInputRef = ref(null)  

const handleSearchIconClick = () => {
  if (isSticky.value) {
    showSearchInput.value = true 
    nextTick(() => {
      const searchInput = document.querySelector('#search')
      searchInput.style.backgroundColor = '#f0f0f0'
      searchInputRef.value.focus()
      searchInputRef.value.placeholder = '说点什么吧'
    })
  }
}

onMounted(() => {
  const keyword = route.query.keyword
  if (keyword) {
    searchKeyword.value = keyword
    isSearched.value = true
    handleSearch()
  }
})
</script>

<template>

  <div class="logo">
    <img src="@/assets/logo/Frame 1@3x.svg" alt="OERC Logo" />
  </div>
  <div class="search-container">
    <div class="search-bar">
      <div class="circle-img">
        <img v-if="isSticky" src="@/assets/logo/Frame 1@3x.svg" alt="logo" />
        <img v-else src="@/assets/icons/home/Group 4.png" alt="search icon" />
      </div>
      <div id="search">
        <input type="text" class="search-input" v-model="searchKeyword" @input="handleSearchInput"
          :placeholder="isSticky ? '' : '一款叫627453的超级棒产品'" @blur="handleInputBlur" ref="searchInputRef"
          v-show="!isSticky || (isSticky && showSearchInput)" />
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
  <div class="drop-menu">
    <ul v-for="(item) in menuList" :key="item.id">
      <div class="menu-item" @click="handleMenuClick(item.id, $event)">
        <li class="menu-title" :class="{
          'selected-title': selectedOptions[item.id],
          'active': showOptions[item.id]
        }">
          {{ getMenuTitle(item.id) }}
          <div class="menu-img" :class="{ 'rotate': showOptions[item.id] }">
            <img src="@/assets/icons/home/Group 5.png" alt="">
          </div>
        </li>
      </div>
      <div class="options" v-if="item.item.length > 0 && showOptions[item.id]">
        <li v-for="(option, idx) in item.item" :key="idx" class="option-item"
          :class="{ selected: selectedOptions[item.id] === option }"
          @click="handleOptionSelect(item.id, option, $event)">
          <span class="radio-button"></span>
          {{ option }}
        </li>
      </div>
    </ul>
  </div>

  <div class="product-area">
    <div class="sum">
      <template v-if="isSearched">
        <span v-if="searchKeyword">
          搜索到{{ filteredProductList.length }}个产品
        </span>
        <span v-else>
          未找到相关产品
        </span>
      </template>
      <span v-else>
        共{{ productStore.productCount }}个产品
      </span>
    </div>
    <div class="product-list">
      <ProductItem v-for="item in filteredProductList" :key="item.id" :info="item" />
    </div>
  </div>
  <div class="back-to-top" v-show="showBackToTop" @click="scrollToTop">
    <img src="@/assets/icons/home/Group 109@3x.svg" alt="back to top" class="up-arrow">
  </div>

</template>

<style scoped lang="scss">
@use "sass:color" as color;
$primary-blue: #012fa6;
$secondary-blue: #4A77CA;
$light-blue: #789edb;
$border-color: #f1faff;

.logo {
  margin: 6.69rem 19.53rem 0;
  height: 1.97rem;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 100%;
    width: auto;
    object-fit: contain;
  }
}

.search-container {
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;

  .search-bar {
    margin: 1.5rem auto;
    width: 27.19rem;
    height: 2.25rem;
    border-radius: 0.75rem;
    border: 0.13rem solid $primary-blue;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #FFFFFF;
    transition: all 0.3s ease;
    box-sizing: border-box;

    .circle-img {
      width: 1.75rem;
      height: 1.75rem;
      padding: 0.25rem 0 0.25rem 0.5rem;
    }

    #search {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 2rem;
      border-radius: 0.66rem;
      box-sizing: border-box;

      .search-input {
        font-family: PingFang SC-Regular;
        color: $light-blue;
        width: 100%;
        border: none;
        font-size: 0.5rem;
        outline: none;
        padding: 0 0.25rem;

        &::placeholder {
          color: $light-blue;
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

    }
  }

  &.sticky {

    padding: 0.8rem 0;

    .search-bar {
      position: relative;
      width: 39.5rem;
      height: 3rem;
      margin: 0;
      border-color: $border-color;
      padding-right: 0.33rem;
      box-shadow: 0rem 0.09rem 0.07rem 0rem rgba(1, 47, 166, 0.02),
        0rem 0.21rem 0.17rem 0rem rgba(1, 47, 166, 0.03),
        0rem 0.39rem 0.31rem 0rem rgba(1, 47, 166, 0.04),
        0rem 0.7rem 0.56rem 0rem rgba(1, 47, 166, 0.04);

      .circle-img {
        padding: 0.25rem 0 0.25rem 0.5rem;
        width: 7rem;
        height: 1.97rem;
        display: flex;
        align-items: center;

        img {
          width: 5rem;
          height: 1.5rem;
          object-fit: contain;
          margin-left: 0.5rem;
        }
      }

      #search {
        background-color: transparent;
        transition: all 0.3s ease;
        width: 19.22rem;

      

        &:focus-within {
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
          background-color: transparent;

          &::placeholder {
            color: transparent;
          }
        }

        .search-img {
          margin-left: auto;

          &:hover {
            &+#search {
              background-color: #f0f0f0;
            }
          }
        }
      }

    }

    .search-suggestions {
      width: 100%;
      position: absolute;
      top: 85%;
      left: 0;
      margin-top: 0.5rem;
      border: 0.13rem solid #CCCCCC;
      z-index: 1001;
      padding: 0.5rem;
      border-radius: 0.63rem;
      box-shadow: 0rem 0.09rem 0.07rem 0rem rgba(1, 47, 166, 0.02),
        0rem 0.21rem 0.17rem 0rem rgba(1, 47, 166, 0.03),
        0rem 0.39rem 0.31rem 0rem rgba(1, 47, 166, 0.04),
        0rem 0.7rem 0.56rem 0rem rgba(1, 47, 166, 0.04);
      padding: 0.5rem;
      box-sizing: border-box;
    }

  }

  .search-suggestions {
    position: absolute;
    width: 27.19rem;
    top: -0.13rem;
    right: -0.13rem; 

    background: #FFFFFF;

    border-radius: 0.75rem;
    box-shadow: 0rem 0.09rem 0.07rem 0rem rgba(1, 47, 166, 0.02),
      0rem 0.21rem 0.17rem 0rem rgba(1, 47, 166, 0.03),
      0rem 0.39rem 0.31rem 0rem rgba(1, 47, 166, 0.04),
      0rem 0.7rem 0.56rem 0rem rgba(1, 47, 166, 0.04);
    padding: 2.5rem 0 0.5rem 0; 
    box-sizing: border-box;
    z-index: -1; 

    .suggestion-item {
      display: flex;
      align-items: center;
      height: 1.19rem;
      padding: 0 0.75rem;
      cursor: pointer;
      transition: all 0.3s ease;
      border-radius: 0.38rem;

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

.drop-menu {
  margin-top: 0.75rem;
  display: flex;
  gap: 0.5rem;
  justify-content: center;

  .menu-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    width: 6.25rem;
    height: 1.5rem;

    .menu-title {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.75rem;
      font-weight: 500;
      color: $secondary-blue;
      cursor: pointer;
      font-family: PingFang SC-Regular;
      transition: all 0.3s ease;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;


      &.selected-title {
        color: $primary-blue;
        font-weight: 500;
      }

      &.active {
        color: $primary-blue;
      }
    }

    .menu-img {
      height: 0.63rem;
      width: 0.63rem;
      transition: transform 0.3s ease;
      margin-left: 0.25rem;

      &.rotate {
        transform: rotate(180deg);
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }

  .options {
    position: absolute;
    width: 6.78rem;
    height: auto;
    padding: 0.5rem 0;
    box-shadow: 0rem 0.63rem 0.63rem 0rem rgba(0, 18, 99, 0.2);
    border-radius: 0.63rem;
    background: #FFFFFF;
    margin-top: 0.5rem;
    z-index: 10;

    .option-item {
      display: flex;
      align-items: center;
      padding: 0.5rem 0.75rem;
      gap: 0.5rem;
      font-size: 0.5rem;
      color: #666666;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(1, 47, 166, 0.1);
        color: $primary-blue;
      }

      .radio-button {
        width: 0.75rem;
        height: 0.75rem;
        border: 1px solid #666666;
        border-radius: 50%;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          width: 0.5rem;
          height: 0.5rem;
          background: transparent;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      &.selected {
        color: $primary-blue;
        background: rgba(1, 47, 166, 0.1);

        .radio-button {
          border-color: $primary-blue;

          &::after {
            background: $primary-blue;
          }
        }
      }
    }
  }
}

.product-area {
  padding: 0 2rem;
  margin: 2.72rem auto;

  .sum {
    font-size: 0.44rem;
    color: $light-blue;
    margin-bottom: 0.41rem;
    margin-left: 1rem;
  }

  .product-list {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;

  }
}

.back-to-top {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  width: 2.25rem;
  height: 2.25rem;
  background: #FFFFFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0rem 0.09rem 0.07rem 0rem rgba(1, 47, 166, 0.02),
    0rem 0.21rem 0.17rem 0rem rgba(1, 47, 166, 0.03),
    0rem 0.39rem 0.31rem 0rem rgba(1, 47, 166, 0.04),
    0rem 0.7rem 0.56rem 0rem rgba(1, 47, 166, 0.04);
  transition: all 0.3s ease;
  z-index: 100;

  &:hover {
    transform: translateY(-0.25rem);
    box-shadow: 0rem 0.13rem 0.25rem rgba(1, 47, 166, 0.15);
  }

  .up-arrow {
    width: 1.25rem;
    height: 1.25rem;
    transform: none;
  }
}
</style>
