<template>
    <b-container class="body">
        <b-row style="height:60vh; overflow:hidden;">
            <b-col>
                <video class="hflip" ref="video" id="video" height="100%" autoplay style="position: absolute; left: -10px;"></video>
            </b-col>
        </b-row>
        <b-row style="height:20vh; padding-top:20px;">
            <b-col>
                <div>
                    <b-row v-for="tag in tags" v-bind:key="tag.time">
                        <b-col>
                            {{tag.time.toLocaleString()}}
                        </b-col>
                        <b-col>
                            {{tag.uid}}
                        </b-col>
                    </b-row>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { ipcRenderer } from 'electron';

// type TagItem = {
//     uid: string,
//     time: Date,
// };

@Component
export default class App extends Vue {
    // tags: TagItem[] = [];
    tags: any[] = [];

    mounted() {
        ipcRenderer.on('tag', (event, uid: string) => {
            // this.tags.push({ uid, time: new Date() } as TagItem);
            this.tags.push({ uid, time: new Date() });
        });
    }
}
</script>

<style lang="scss">
</style>