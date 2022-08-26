<template>
  <a-menu
    class="lg:font-bold lg:w-9/12 lg:text-[0.9rem] lg:bg-base lg:px-24 lg:space-x-16 hidden lg:block lg:text-black"
    mode="horizontal"
    :default-selected-keys="['1']"
    :style="{ lineHeight: '80px' }"
  >
    <a-menu-item key="1">
      HOME
    </a-menu-item>
    <a-menu-item key="2">
      SHOP
    </a-menu-item>
    <a-menu-item key="3">
      BLOG
    </a-menu-item>
    <a-menu-item key="4">
      PAGES
    </a-menu-item>
    <a-menu-item key="5">
      ABOUT US
    </a-menu-item>
  </a-menu>
</template>

<style lang="scss" scoped>
.ant-menu-horizontal{
    border-bottom:none ;
}
.ant-menu-horizontal > .ant-menu-item:hover,
.ant-menu-horizontal > .ant-menu-item-selected{
    color: #f79837;

}
.ant-menu-horizontal > .ant-menu-item:hover,
.ant-menu-horizontal > .ant-menu-item-selected,
.ant-menu-horizontal > .ant-menu-item, .ant-menu-horizontal > .ant-menu-submenu {
    border-bottom: none;
}
</style>
