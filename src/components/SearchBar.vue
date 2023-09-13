<script setup>
import { ref } from "vue";

const searchTag = ref();
const searchValue = ref('')

defineEmits(['clickOnLoc', 'onSubmit']);

function onSearchClick() {
    searchTag.value.focus()
}



</script>

<template>
    <div class="search-container">
        <div class="w-search-box">
            <i @click="onSearchClick">🔍</i>
            <div class="search-container">
                <form @submit.prevent="$emit('onSubmit', searchValue)"> 
                    <input ref="searchTag" type="search" id="w-search" placeholder="Search City" autocomplete="off" v-model="searchValue">
                </form>
            </div>
            <button @click="$emit('clickOnLoc')">
                <i>Loc</i>
            </button>
        </div>
        <!-- <ul>
            <li>lorem5</li>
            <li>lorem5</li>
            <li>lorem5</li>
            <li>lorem5</li>
            <li>lorem5</li>
        </ul> -->
    </div>
</template>


<style scoped>
.search-container {
    /* z-index: 5; */
    position: relative;

    /* top: 0;
    left: 0;*/
    z-index: 5; 

}

.search-container ul {
    position: absolute;
    margin-block-start: .25rem;
    list-style: none;

    background-color: #fff;
    width: 100%;
    background-color: #a0a0a0;
}

.w-search-box {
    display: flex;
    margin-right: .5rem;
    column-gap: .25rem;

    border: 1px solid black;
    padding: .75rem .5rem;
    border-radius: 28px;
    background-color: #a0a0a0;
}

.search-container [type="search"] {
    background-color: inherit;
    border: 0;
    height: 100%;
    outline: none;
    /* flex: 1; */
}

.search-container [type="search"]::placeholder {
    color: #fff;
    height: 2rem;
    font-size: 1.05rem;
}
</style>