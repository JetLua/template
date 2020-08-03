<section>
  <div on:click={click}>{name}</div>
</section>

<script lang="ts">
  let name = 'click'
  function  click() {
    name = 'ok'
  }
</script>

<style lang="less">
  section {
    div {
      color: red;
    }
  }
</style>
