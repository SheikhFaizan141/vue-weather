<script setup>
import { ref,onMounted, watchEffect } from "vue";

const searchTag = ref();

const list = ref([]);
const isActive = ref(false);

onMounted(() => {
    document.addEventListener('click', (e) => {
        // console.dir(e.target);
        if (!e.target.closest('#search-bar')) {
            isActive.value = false;
            selected.value = -1;
        }

        console.log(isActive.value);
        // console.log(e.target.closest('#search-bar'));
    })
})



defineProps(['modelValue']);
const emit = defineEmits(['clickOnLoc', 'location']);

const searchValue = ref('')
const selected = ref(-1);


function onSearchClick() {
    searchTag.value.focus();
}

function handleKeyDown(index) {
    selected.value = selected.value < list.value.length - 1 ? selected.value + 1 : -1;
}

function handleKeyUp(e) {
    selected.value = selected.value > -1 ? selected.value - 1 : list.value.length - 1;
}

function handleClick(index) {
    console.log('hi');
    let lat = list.value[index]['lat'];
    let lon = list.value[index]['lon'];

    emit('location', lat, lon);
    isActive.value = false;    
}

watchEffect(async () => {
    if (searchValue.value !== '') {
        try {
            const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchValue.value}&limit=5&appid=d5cf16c9a343a988a0ba9ec47620dc88`);

            if (!res.ok) {
                console.log('error');
            }

            const data = await res.json();
            list.value = data;
            // console.log(data);
            isActive.value = list.value.length > 0 ? true : false;

        } catch (error) {

        }
    }
});


function handleSubmit() {
    if (selected.value > -1 && isActive) {
        let lat = list.value[selected.value].lat;
        let lon = list.value[selected.value].lon;
        console.log(lat, lon);
        emit('location',lat, lon);
        isActive.value = false;
    }
    console.log(selected.value);
}

</script>

<template>
    <div id="search-bar" class="search-container">

        <div class="w-search-box">
            <i @click="onSearchClick"><font-awesome-icon icon="magnifying-glass" /></i>
            <!-- <div > -->
            <form @submit.prevent="handleSubmit">
                <input 
                    ref="searchTag" type="search" 
                    id="w-search" placeholder="Search City" 
                    autocomplete="off"
                    v-model.trim="searchValue"
                    @keydown.down="handleKeyDown"
                    @keydown.up.prevent="handleKeyUp"
                >
            </form>
            <!-- </div> -->
            <div class="s-loc-btn" @click="$emit('clickOnLoc')">
                <i><font-awesome-icon icon="fa-solid fa-location-dot" /></i>
            </div>
        </div>
        <ul 
         class="search-ul" v-if="isActive"
       
        >
            <li 
             class="s-items" v-for="({ name, state, country, lat, lon }, index) in list" 
             @click.stop="handleClick(index)"
             :class="{'s-item-selected': index === selected}"
             :key="name+state+country+lat+lon"
            >
                <span class="s-item-city">
                    {{ name }},
                </span>
                <span v-if="state" class="s-item-state">
                    {{ state }},
                </span>
                <span class="s-item-con">
                    {{ country }}
                </span>
            </li>
        </ul>
    </div>
</template>


<style scoped>
.search-container {
    color: whitesmoke;
    position: relative;
    background-color: #38444d;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    z-index: 5;
    font-size: 1.05rem;
    /* padding: .5rem .5rem 0 .5rem; */
    /* padding-block-end: 10px; */

}

/* .s-loc-btn {
    background-color: greenyellow;
} */

.search-container ul {
    position: absolute;
    /* margin-block-start: .25rem; */
    list-style: none;
    width: 100%;
    background-color: inherit;
    padding-left: 0;
    padding-block-end: 1rem;
    border-end-end-radius: 3px;
    border-end-start-radius: 3px;
}

.search-ul li {
    list-style-type: none;
    padding: .25rem .75rem .25rem .75rem;
    /* margin-block-end: .25rem; */
    /* font-size: 1.05rem; */
    cursor: default;
    /* border-block-end: 1px solid rgb(255, 255, 255); */
}

.search-ul> :last-child {
    /* padding-block-end: 0; */
    margin-block-end: 0;
    border-block-end: 0;
}

.search-ul li:hover {
    /* transition: background-color 100ms ease-in-out ; */
    background-color: rgb(175, 175, 175);
    /* border-inline-start: .25rem solid rgb(0, 0, 0); */
}

.s-item-selected {
    background-color: rgb(175, 175, 175);
    border-inline-start: .25rem solid rgb(0, 0, 0);
}

.w-search-box {
    display: flex;
    align-items: stretch;
    margin-right: .5rem;
    column-gap: .25rem;

    padding: .75rem .5rem;

}

.search-container [type="search"] {
    background-color: inherit;
    color: white;
    column-rule-color: orange;
    border: 0;
    height: 100%;
    outline: none;
    font-size: inherit;

    display: block;
    caret-color: rgb(255, 255, 255);
}

.search-container [type="search"]::placeholder {
    color: #ffffff;

}

/*  */
</style>