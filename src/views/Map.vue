<template>
  <div>
      <h1>MAP PAGE</h1>
      <p>I see {{ totalSkills }} Skills!</p>
  </div>
</template>

<script>
export default {
  name: 'Map',
  computed: {
    totalSkills () {
      return this.$store.state.totalSkills
    }
  }
}
</script>