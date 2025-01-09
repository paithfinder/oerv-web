<template>
    <div class="product-item" @click="handleClick">
        <div class="product-item-img">
            <img :src="info.imgUrl" alt="product image">
            <div class="product-item-tag" v-if="info.tag">{{ info.tag }}</div>
        </div>
        <div class="product-item-info">
            <div class="product-item-name">{{ info.name }}</div>
            <div class="product-item-desc">{{ info.description }}</div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
    info: {
        type: Object,
        required: true
    }
})
const handleClick = () => {
    router.push({
        name: 'board',
        params: { id: props.info.id }
    })
}
</script>

<style scoped lang="scss">
.product-item {
    width: 7.5rem;
    height: 8.72rem;
    background: #FFFFFF;
    border-radius: 0.63rem;
    overflow: hidden;
    box-shadow: 0rem 0.13rem 0.25rem 0rem rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    transform: translateY(0);
    cursor: pointer;

    &:hover {
        box-shadow: 0rem 0.25rem 0.5rem 0rem rgba(0, 0, 0, 0.15);
        transform: translateY(-0.25rem);
    }

    &-img {
        height: 5.63rem;
        width: 100%;
        overflow: hidden;
        position: relative;

        
    }

    &-tag {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        right: 0;
        width: 2.81rem;
        color: white;
        font-size: 0.5rem;
        height: 1.06rem;
        background: rgba(1, 47, 166, 0.8);
        border-radius: 0rem 0.63rem 0rem 0.63rem;
    }

    &-info {
        padding: 0.5rem 0.5rem 0 0.5rem;
        box-sizing: border-box;
    }

    &-name {
        font-size: 0.5rem;
        color: #000000;
        margin-bottom: 0.25rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &-desc {
        margin-top: 0.16rem;
        font-size: 0.44rem;
        color: #666666;
        overflow: hidden;
        font-weight: 400;
        line-height: 0.51rem;
        font-family: PingFang SC-Regular;
    }

}
</style>