<script setup>
import { ref, watchEffect } from "vue";

const searchTag = ref();
const list = ref([]);
const isActive = ref(false);
const searchText = ref('')
const selected = ref(-1);

const emit = defineEmits(['clickOnLoc', 'location']);


watchEffect(() => {
    if (searchText.value === '' && list.value.length > 0) {
        list.value = [];
        isActive.value = false;
    }
});

async function handleInput() {
    if (searchText.value !== '') {
        try {
            const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchText.value}&limit=5&appid=d5cf16c9a343a988a0ba9ec47620dc88`);

            if (!res.ok) {
                throw new Error("Network response was not OK");
            }

            const data = await res.json();
            list.value = data;
            isActive.value = list.value.length > 0 ? true : false;
        } catch (error) {
            console.log(error);
        }
    }
}

function onSearchClick() {
    searchTag.value.focus();
}

function arrowDown(index) {
    selected.value = selected.value < list.value.length - 1 ? selected.value + 1 : -1;
}

function arrowUp(e) {
    selected.value = selected.value > -1 ? selected.value - 1 : list.value.length - 1;
}


function handleFouse() {
    if (list.value.length > 0) {
        isActive.value = true;
    }
}

function handleBlur() {
    if (searchText.value === '') {
        list.value = [];
    }


    isActive.value = false;
    selected.value = -1;
}


function handleClick(index) {
    let lat = list.value[index]['lat'];
    let lon = list.value[index]['lon'];

    emit('location', lat, lon);
    isActive.value = false;
}


function handleSubmit() {
    if (selected.value > -1 && isActive) {
        let lat = list.value[selected.value].lat;
        let lon = list.value[selected.value].lon;
        // console.log(lat, lon);

        emit('location', lat, lon);
        isActive.value = false;
    }
    // console.log(selected.value);
}

</script>

<template>
    <div
        id="search-bar"
        class="search-container"
        :data-expand="isActive"
    >

        <div class="w-search-box">
            <i @click="onSearchClick">
                <font-awesome-icon icon="magnifying-glass" />
            </i>
            <form @submit.prevent="handleSubmit">
                <input
                    ref="searchTag"
                    type="search"
                    id="w-search"
                    placeholder="Search City"
                    autocomplete="off"
                    v-model.trim="searchText"
                    @input="handleInput"
                    @keydown.down="arrowDown"
                    @keydown.prevent.up="arrowUp"
                    @focus="handleFouse"
                    @blur="handleBlur"
                >
            </form>
            <div
                class="s-loc-btn"
                @click="$emit('clickOnLoc')"
            >
                <i><font-awesome-icon icon="fa-solid fa-location-dot" /></i>
            </div>
        </div>
        <ul
            class="search-ul"
            v-show="isActive"
        >
            <li
                class="s-items"
                v-for="({ name, state, country, lat, lon }, index) in list"
                @click.stop="handleClick(index)"
                :class="{ 's-item-selected': index === selected }"
                :key="name + state + country + lat + lon"
            >
                <span class="s-item-city">
                    {{ name }},
                </span>
                <span
                    v-if="state"
                    class="s-item-state"
                >
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
    border-radius: 4px;
    z-index: 10;
    font-size: 1.05rem;

    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.search-container[data-expand=true] {
    border-end-end-radius: 0;
    border-end-start-radius: 0;
}


/* .s-loc-btn {
    background-color: greenyellow;
} */

.search-container ul {
    position: absolute;
    list-style: none;
    width: 100%;
    background-color: inherit;
    padding-left: 0;
    padding-block-end: 1rem;
    border-end-end-radius: 3px;
    border-end-start-radius: 3px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.search-ul li {
    list-style-type: none;
    padding: .25rem .75rem .25rem .75rem;
    cursor: default;
}

.search-ul> :last-child {
    margin-block-end: 0;
    border-block-end: 0;
}

.search-ul li:hover {
    background-color: rgb(175, 175, 175);
}

.s-item-selected {
    background-color: rgb(175, 175, 175);
    border-inline-start: .25rem solid rgb(0, 0, 0);
}

.s-loc-btn:hover {
    color: mintcream;
    transform: scale(.96);
    transition: transform;
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
    column-rule-color: #ffa500;
    border: 0;
    height: 100%;
    outline: none;
    font-size: inherit;

    display: block;
    caret-color: rgb(255, 255, 255);
}

.search-container [type="search"]::placeholder {
    color: rgb(197, 195, 195);
    font-size: 1.015rem;

}
</style>