<template>
  <div class="footer">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center credit">
          Made by
          <a href="http://hossammarey.com" target="_blank">Hossam Marey</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainFooter"
};
</script>

<style lang="scss" scoped>
.footer {
  opacity: 0.7;
  margin: 15px auto 15px auto;
  position: relative;
  font-size: 14px;

  &::before{
    content: '';
    width: 20vw;
    height: 1px;
    border-bottom: 1px solid rgb(226, 227, 231);
    border-top: 1px solid rgb(187, 189, 197);
    border-radius: 5px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -15px);
  }
  a {
    color: #cf4a47;
  }
}
</style>