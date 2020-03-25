<section>
  <div on:click={click}>{name}</div>
</section>

<script>
  export let name = 'click'
  function  click(ev) {
    name = '囧'
  }
</script>

<style lang="less">
  section {
    div {
      color: red;
    }
  }
</style>
