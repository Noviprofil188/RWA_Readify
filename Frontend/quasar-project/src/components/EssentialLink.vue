<template>
  <q-item
    clickable
    :tag="props.action ? 'div' : (isExternalLink ? 'a' : 'router-link')"
    :target="isExternalLink ? '_blank' : undefined"
    :href="isExternalLink ? props.link : undefined"
    :to="!isExternalLink && !props.action ? props.link : undefined"
    @click="handleClick"
  >
    <q-item-section
      v-if="props.icon"
      avatar
    >
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
      <q-item-label caption>{{ props.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { computed } from 'vue';

defineOptions({
  name: 'EssentialLink'
});

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: '#'
  },
  icon: {
    type: String,
    default: ''
  },
  action: {
    type: Function,
    default: null
  }
});

const isExternalLink = computed(() => {
  return props.link.startsWith('http://') || props.link.startsWith('https://');
});

const handleClick = () => {
  if (props.action) {
    props.action(); // Pozovi akciju ako postoji
  }
};
</script>