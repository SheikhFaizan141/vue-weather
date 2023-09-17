<script setup>
import { ref } from "vue";

const searchTag = ref();

const list = ['one', 'two', 'three', 'four', 'five'];

defineProps(['modelValue']);
defineEmits(['clickOnLoc', 'update:modelValue']);

const searchValue = ref('')


function onSearchClick() {
    searchTag.value.focus()
}

function handleKeyDown(e) {
    
}

function handleKeyUp(e) {
    
}

function handlePlaceClick(e) {
    
}



</script>

<template>
    <div class="search-container">
        <div class="w-search-box">
            <i @click="onSearchClick">🔍</i>
            <div class="search-container">
                <form @submit.prevent="$emit('onSubmit', modelValue)"> 
                    <input 
                        ref="searchTag" 
                        type="search" 
                        id="w-search" 
                        placeholder="Search City" 
                        autocomplete="off" 
                        :value="modelValue"
                        @input="$emit('update:modelValue', $event.target.value)"
                    >
                </form>
            </div>
            <button @click="$emit('clickOnLoc')">
                <i>Loc</i>
            </button>
        </div>
        <ul 
        class="search-ul" 
        v-if="modelValue"
        >
            <li
            class="s-items"
            v-for="name in list"
            @keydown="handleKeyDown"
            @keyup="handleKeyUp"
            >
            item {{ item }}
            </li>
        </ul>
    </div>
</template>


<style scoped>
.search-container {
    color: #000;
    position: relative;

    z-index: 5; 

}

.search-container ul {
    position: absolute;
    margin-block-start: .25rem;
    list-style: none;
    width: 100%;
    background-color: #a0a0a0;
    padding: 0;
}

.search-ul {
    padding: 0;
}

.search-ul li {
    list-style-type: none;
    padding: .25rem;
}
.search-ul li:hover {
    background: orange;
}

.w-search-box {
    display: flex;
    align-items: center;
    margin-right: .5rem;
    column-gap: .25rem;
    
    padding: .75rem .5rem;
    border-radius: 28px;
    background-color: #a0a0a0;
}

.search-container [type="search"] {
    background-color: inherit;
    border: 0;
    height: 100%;
    outline: none;
    font-size: 1rem;
    /* color: #d8d8d8; */
    /* padding: .25rem 0; */
}

.search-container [type="search"]::placeholder {
    color: #000;
    display: block;
   
}

/*  */

</style>