<template>
<table>
    <thead>
    <tr>
        <th @click="sortCriteria('name')" title="Sort by tag name">
            Tags
            {{tagCount}}
            <span v-if="sortAZ">↓</span>
            <span v-else>↑</span>
        </th>

        <th class="border-left" colspan="2" @click="sortCriteria('freq')" title="Sort by tag number">
            Count
            {{elementCount}}
            <span v-if="sortAZ">↓</span>
            <span v-else>↑</span>
        </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="tag in sortedTags"
        :key="tag.name"
        @mouseenter="highlight(tag.name)"
        @mouseleave="unhighlight()">
        <th>
            <code>&lt;{{tag.name}}&gt;</code>
        </th>
        <td class="border-left">
            {{tag.freq}}
        </td>
        <td class="border-left">
            <div class="bar-container">
                <div class="bar" :style="{ width: tagBar(tag)}"></div>
            </div>
        </td>
    </tr>
    </tbody>
</table>
</template>

<script>

function generateSortFunction(by = 'name', az = true) {
    if (az) {
        return by === 'name' ?
            (t1, t2) => t1.name.localeCompare(t2.name)
            :
            (t1, t2) => t1.freq - t2.freq;
    } else {
        return by === 'name' ?
            (t1, t2) => t2.name.localeCompare(t1.name)
            :
            (t1, t2) => t2.freq - t1.freq;
    }
}

export default {
    name: 'stats',
    props: ['tags', 'getTagList', 'highlight', 'unhighlight' ],
    methods: {
        tagBar(tag) {
            return '10%';
        },
        sortCriteria(field) {
            if (this.sortField !== field) {
                this.sortField = field;
            } else {
                this.sortAZ = !this.sortAZ;
            }
        }
    },
    computed: {
        normalizeTags() {
            const res = {};
            this.tags.forEach(t => {
                if (res[t] === undefined) {
                    res[t] = { name: t, freq: 1 };
                } else {
                    res[t].freq++;
                }
            })
            return Object.values(res);
        },
        tagCount() {
            return this.normalizeTags.length
        },
        elementCount() {
            return this.tags.length;
        },
        sortedTags() {
            return this.normalizeTags.sort(generateSortFunction(this.sortField, this.sortAZ));
        }
    },
    data() {
        return {
            sortAZ: true,
            sortField: 'name'
        }
    }
}
</script>

<style lang="css">
.border-left {
    border-left: 1px solid #dfdfdf;
}
</style>
