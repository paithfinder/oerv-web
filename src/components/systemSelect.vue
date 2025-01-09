<script setup>
import { ref, watch, computed, defineComponent } from 'vue'
import 'github-markdown-css'
import { defineProps, defineEmits } from 'vue'
import desriName from '@/components/desriName.vue'
const props = defineProps({
    openEulerItem: {
        type: Object,
        required: true
    },
    openEulerList: {
        type: Array,
        required: true
    }
})
import HelloWord from '../../HelloWord.md'
defineComponent({
    HelloWord
})
const emit = defineEmits(['update-index'])

watch(() => props.openEulerItem, (newValue) => {
    console.log('openEulerItem changed:', newValue)
}, { immediate: true, deep: true })  

const handlePrevClick = () => {
    const newIndex = props.openEulerItem.id - 2
    if (newIndex >= 0) {
        emit('update-index', newIndex)
        console.log('Prev clicked, new index:', newIndex)
    }
}

const handleNextClick = () => {
    const newIndex = props.openEulerItem.id
    emit('update-index', newIndex)
    console.log('Next clicked, new index:', newIndex)
}

const selectedItem = ref(null)
const handleFileClick = (index) => {
    selectedItem.value = index
}
const handleDownload = (index) => {
    console.log('Downloading file:', index)
}

const pageIndicator = computed(() => {
    return `${props.openEulerItem.id}/${props.openEulerList.length}`
})

console.log(props.openEulerItem, '我是0元素')

const selectedKernel = ref('olk-6.6')
const isDropdownOpen = ref(false)
const currentHoverItem = ref(null)

const handleSelect = (option) => {
    selectedKernel.value = option.value
    currentHoverItem.value = null
    isDropdownOpen.value = false
}

const kernelOptions = ref([
    { value: 'olk-6.6', label: 'olk-6.6', hasKernelSource: true},
    { value: 'olk-6.6olk-6.6', label: 'olk-6.6olk-6.6', hasKernelSource: false },
    { value: 'olk-6.6olk-6.6olk-6.6olk-6.6-1', label: 'olk-6.6olk-6.6olk-6.6olk-6.6', hasKernelSource: false},
    { value: 'olk-6.6olk-6.6olk-6.6olk-6.6-2', label: 'olk-6.6olk-6.6olk-6.6olk-6.6', hasKernelSource: false}
])
const showHelpDialog = ref(false)
const handleHelpClick = () => {
    showHelpDialog.value = true
}

const handleCloseDialog = () => {
    showHelpDialog.value = false
}

const selectedPackage = ref('Headless')
const isPackageDropdownOpen = ref(false)
const currentPackageHoverItem = ref(null)

const packageOptions = ref([
    { value: 'Headless', label: 'Headless' },
    { value: 'Server', label: 'Server' },
    { value: 'Desktop', label: 'Desktop' }
])

const handlePackageSelect = (option) => {
    selectedPackage.value = option.value
    currentPackageHoverItem.value = null
    isPackageDropdownOpen.value = false
}
</script>

<template>
    <!-- 添加系统选择区域 -->
    <div class="system-select">
        <div class="select-title">
            <div class="title-text">OpenEuler 24.03 SPI</div>
        </div>
        <div class="select-content">
            <div class="select-drop">
                <div class="select-row">
                    <div class="select-label">内核版本:</div>
                    <div class="select-box">
                        <div class="select-wrapper">
                            <div class="custom-select" @click="isDropdownOpen = !isDropdownOpen">
                                <div class="selected-value">
                                    {{ kernelOptions.find(opt => opt.value === selectedKernel)?.label }}
                                    <span v-if="kernelOptions.find(opt => opt.value === selectedKernel)?.hasKernelSource" 
                                          class="kernel-source-tag">内核同源</span>
                                </div>
                                <img src="../assets/icons/board/Group 85@3x.svg" alt="dropdown" class="dropdown-icon" :class="{ 'rotated': isDropdownOpen }">
                            </div>
                            <div v-show="isDropdownOpen" class="dropdown-menu">
                                <div v-for="option in kernelOptions" 
                                     :key="option.value"
                                     class="dropdown-item"
                                     :class="{ 'selected': option.value === currentHoverItem }"
                                     @mouseenter="currentHoverItem = option.value"
                                     @mouseleave="currentHoverItem = null"
                                     @click="handleSelect(option)">
                                    <div class="option-content">
                                        <span class="option-label">{{ option.label }}</span>
                                      
                                        <span v-if="option.hasKernelSource" class="kernel-source-tag">内核同源</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="select-row">
                    <div class="select-label">用户态包组:</div>
                    <div class="select-box">
                        <div class="select-wrapper">
                            <div class="custom-select" @click="isPackageDropdownOpen = !isPackageDropdownOpen">
                                <div class="selected-value">
                                    {{ packageOptions.find(opt => opt.value === selectedPackage)?.label }}
                                </div>
                                <img src="../assets/icons/board/Group 85@3x.svg" 
                                     alt="dropdown" 
                                     class="dropdown-icon" 
                                     :class="{ 'rotated': isPackageDropdownOpen }">
                            </div>
                            <div v-show="isPackageDropdownOpen" class="dropdown-menu">
                                <div v-for="option in packageOptions" 
                                     :key="option.value"
                                     class="dropdown-item"
                                     :class="{ 'selected': option.value === currentPackageHoverItem }"
                                     @mouseenter="currentPackageHoverItem = option.value"
                                     @mouseleave="currentPackageHoverItem = null"
                                     @click="handlePackageSelect(option)">
                                    <div class="option-content">
                                        <span class="option-label">{{ option.label }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="file-list">
                <div class="file-item" v-for="(item, index) in 7" :key="index"
                    :class="{ 'active': selectedItem === index }" @click="handleFileClick(index)">
                    <div class="file-name">文件名文件名文件名文件名文件名文件名文件名文件名.JPG</div>
                    <div class="file-info">
                        <span class="file-size">128GB</span>
                        <span v-if="selectedItem === index" class="download-btn" @click.stop="handleDownload(index)">
                            点击下载
                        </span>
                    </div>
                </div>
            </div>

            <div class="button-area">
                <!-- 添加帮助文档按钮 -->
                <div class="help-btn">
                    <div class="btn-border" @click="handleHelpClick">
                        查看帮助文档
                    </div>
                </div>
                <div class="pagination">
                    <span class="page-indicator">{{ pageIndicator }}</span>
                    <button class="prev-btn" @click="handlePrevClick"> ← </button>

                    <button class="next-btn" @click="handleNextClick"> → </button>
                </div>

            </div>
        </div>
    </div>

    <!-- 添加帮助文档弹窗 -->
    <div class="help-dialog" v-if="showHelpDialog" @click.self="handleCloseDialog">
        <div class="dialog-content">
            <desriName name="OpenEuler 24.03 SPI" />
            <div class="selectedGroup">
                <div class="version">
                    <div class="label">内核版本：</div>
                    <div class="value">olk-6.6</div>
                </div>
                <div class="package">
                    <div class="label">用户态包组：</div>
                    <div class="value">Headless</div>
                </div>
            </div>
            <!-- 添加文件列表 -->
            <div class="help-file-list">
                <div class="file-item">
                    <div class="file-name">文件名文件名文件名文件名文件名文件名文件名文件名.PNG</div>
                    <div class="file-size">128GB</div>
                </div>
                <div class="file-item">
                    <div class="file-name">文件名文件名文件名文件名文件名文件名.JPG</div>
                    <div class="file-size">128GB</div>
                </div>
            </div>
            <div class="upload-area">
                <div class="upload-text">
                    <HelloWord />
                </div>
            </div>
            <div class="description">
                <div class="desc-title">板卡说明：</div>
                <div class="desc-content">100字以内100字以内100字以内100字以内100字以内100字以内100字以内100字以内100字以内100字以内100字以内
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
$primary-blue: #012fa6;
$secondary-blue: #4A77CA;
$light-blue: #789edb;
$border-color: #f1faff;

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
            gap: 0.5rem;

            .select-row {
                display: flex;
                flex-direction: column;




                .select-label {
                    min-width: 4rem;
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

                        .kernel-source-tag {
                            display: inline-block;
                            padding: 0.1rem 0.3rem;
                            background-color: #3459b8;
                            color: #FFFFFF;
                            border-radius: 0.2rem;
                            font-size: 0.4rem;
                            margin-left:0.3rem;
                   
                        }
                    }



                    select {
                        min-width: 7rem;
                        width: auto;
                        height: 1.03rem;
                        border: 1px solid #E5E5E5;
                        border-radius: 0.25rem;
                        padding: 0 2rem 0 0.5rem;
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

                        option {
                            padding: 0.5rem;
                            background: #FFFFFF;

                            &:checked {
                                background: #E6F7FF; 
                                color: #333;
                            }

                            &:hover {
                                background: #E6F7FF;
                            }
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
                        transition: transform 0.3s ease;
                        
                        &.rotated {
                            transform: translateY(-50%) rotate(180deg);
                        }
                    }
                }
            }
        }

        .file-list {
            margin-top: 0.5rem;
            max-height: 7rem;
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
                cursor: pointer;
                transition: all 0.3s ease;

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
                    font-size: 0.47rem;
                    color: #666;
                    margin-left: 1rem;
                }

                &.active {
                    background-color: #466edb;
                    color: white;

                    .file-name,
                    .file-size {
                        color: white;
                    }
                }

                .file-info {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;

                    .download-btn {

                        color: white;
                        font-size: 0.47rem;
                        cursor: pointer;
                        white-space: nowrap;

                       
                    }
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
                align-items: flex-end;
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

                .page-indicator {
                    font-size: 0.47rem;
                    color: #666;

                    min-width: 1rem;
                    text-align: right;
                    height: 1rem;
                    line-height: 1rem;
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
select:focus {
    option {
        padding: 0.5rem;

        &:checked {
            background: #E6F7FF;
            color: #333;
        }
    }
}

.help-dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

    .dialog-content {
        height: 34.78rem;
        width: 40.88rem;
        background: #FFFFFF;
        border-radius: 0.63rem;
        box-shadow: 0 0.13rem 0.25rem rgba(0, 0, 0, 0.15);
        position: relative;
        animation: dialogFadeIn 0.3s ease;
        padding: 0rem 1.5rem;

        .selectedGroup {
            display: flex;
            gap: 2rem;
            margin-top: 1rem;

            .version,
            .package {
                display: flex;

                flex-direction: column;
                justify-content: flex-start;

                .label {
                    font-size: 0.44rem;
                    color: #666666;
                }

                .value {
                    font-size: 0.47rem;
                    color: #333333;
                    margin-top: 0.2rem;
                }
            }
        }

        .help-file-list {
            margin-top: 1rem;

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

                .file-name {
                    font-size: 0.47rem;
                    color: #333333;
                    flex: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .file-size {
                    font-size: 0.47rem;
                    color: #666666;
                    margin-left: 1rem;
                }
            }
        }

        .upload-area {
            width: 100%;
            height: 17.19rem;
            background: #F5F5F5;
            border-radius: 0.31rem;
            margin-top: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;

            .upload-text{
                max-height: 100%;
                overflow-y: auto;
            }


        }

        .description {
            margin-top: 1rem;

            .desc-title {
                font-size: 0.44rem;
                color: #666666;
                margin-bottom: 0.5rem;
            }

            .desc-content {
                font-size: 0.47rem;
                color: #333333;
                line-height: 1.5;
            }
        }
    }
}
@keyframes dialogFadeIn {
    from {
        opacity: 0;
        transform: translateY(-1rem);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.custom-select {
    min-width: 7rem;
    width: auto;
    height: 1.03rem;
    border: 1px solid #E5E5E5;
    border-radius: 0.25rem;
    padding: 0 2rem 0 0.5rem;
    font-size: 0.47rem;
    color: #333;
    background-color: #FFFFFF;
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
    box-sizing: border-box;

    .selected-value {
        display: flex;
        align-items: center;
       
    }
    &:hover{
        border-color: $primary-blue;

    }
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    border-radius: 0.25rem;
    margin-top: 0.2rem;
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding:0.2rem;
 
}

.dropdown-item {
    padding: 0.3rem;
    cursor: pointer;
    box-sizing: border-box;
    &:hover {
        background:#e8f2ff;
        border-radius: 0.3rem;

    }

    &.selected {
        background: #e8f2ff;
    }

    .option-content {
        display: flex;
        align-items: center;
        width: 100%;
    }

    .option-label {
 
        font-size: 0.47rem;
        color: #333;
    }


}
.markdown-body {
   font-size:0.44rem !important;
}
</style>