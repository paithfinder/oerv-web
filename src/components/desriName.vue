<script setup>
import { defineProps } from 'vue';
const props=defineProps({
    name:{
        type:String   
    }
})
</script>

<template>
  <div class="titleBox">
    <div class="blueBlock"></div>
    <div class="name">{{props.name}}</div>
  </div>
</template>

<style scoped lang="scss">
.titleBox{
   width: fit-content;
    height:0.7rem;
    display:flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.5rem;
    margin-top:1rem;
    .blueBlock{
        width:0.13rem;
        height:0.44rem;
        background-color:rgba(1, 47, 166) ;
    }
    .name{
      margin-left: 0.2rem;
    }
}
</style>