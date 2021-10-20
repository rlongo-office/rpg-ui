<template>
  <div>
    <h1>Character Sheet</h1>
      <CharacterHeader></CharacterHeader>
  </div>
</template>
<script>
  import CharacterHeader from "../components/CharacterHeader.vue"

export default {
  name: 'chat',
  components: {'CharacterHeader':CharacterHeader,
              }
}
</script>
