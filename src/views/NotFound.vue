<!-- Error 404 page -->
<template>
  <div id="err_page">
    <h1 class="err_page_glitch" data-text="Error 404">Error 404</h1>
    <span class="err_page_sub">Error 404: Page Not Found</span>
    <br />
    <br />
    <a href="/">Click here to go to the home page</a>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#err_page {
  text-align: center;
}
.err_page_sub {
  color: #2e31d6;
  letter-spacing: 0.3em;
}
.err_page_glitch {
  position: relative;
  color: black;
  font-size: 4em;
  letter-spacing: 0.5em;
}
.err_page_glitch::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  left: 2px;
  text-shadow: -2px 0 #000000;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim 10s infinite linear alternate-reverse;
}
.err_page_glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  left: -1px;
  text-shadow: -1px 0 #cccccc, 1px 1px #707070;
  animation: glitch-anim2 0.5s infinite linear alternate-reverse;
}

@keyframes glitch-anim {
  0% {
    clip: rect(77px, 9999px, 4px, 0);
    transform: skew(0.95deg);
  }
  1% {
    clip: rect(79px, 9999px, 86px, 0);
    transform: skew(0.99deg);
  }
  2% {
    clip: rect(1px, 9999px, 2px, 0);
    transform: skew(0.55deg);
  }
  3% {
    clip: rect(12px, 9999px, 12px, 0);
    transform: skew(0.59deg);
  }
  4% {
    clip: rect(26px, 9999px, 36px, 0);
    transform: skew(0.72deg);
  }
  5% {
    clip: rect(70px, 9999px, 86px, 0);
    transform: skew(0.3deg);
  }
  6% {
    clip: rect(55px, 9999px, 93px, 0);
    transform: skew(0.98deg);
  }
  7% {
    clip: rect(75px, 9999px, 81px, 0);
    transform: skew(0.3deg);
  }
  8% {
    clip: rect(70px, 9999px, 73px, 0);
    transform: skew(0.97deg);
  }
  9% {
    clip: rect(71px, 9999px, 40px, 0);
    transform: skew(0.72deg);
  }
  10% {
    clip: rect(52px, 9999px, 99px, 0);
    transform: skew(0.83deg);
  }
  11% {
    clip: rect(58px, 9999px, 46px, 0);
    transform: skew(0.14deg);
  }
  12% {
    clip: rect(9px, 9999px, 29px, 0);
    transform: skew(0.22deg);
  }
  13% {
    clip: rect(12px, 9999px, 81px, 0);
    transform: skew(0.05deg);
  }
  14% {
    clip: rect(75px, 9999px, 52px, 0);
    transform: skew(0.32deg);
  }
  15% {
    clip: rect(58px, 9999px, 80px, 0);
    transform: skew(0.73deg);
  }
  16% {
    clip: rect(33px, 9999px, 76px, 0);
    transform: skew(0.69deg);
  }
  17% {
    clip: rect(78px, 9999px, 23px, 0);
    transform: skew(0.59deg);
  }
  18% {
    clip: rect(62px, 9999px, 7px, 0);
    transform: skew(0.17deg);
  }
  19% {
    clip: rect(69px, 9999px, 39px, 0);
    transform: skew(0.28deg);
  }
  20% {
    clip: rect(28px, 9999px, 2px, 0);
    transform: skew(0.26deg);
  }
  100% {
    clip: rect(0px, 9999px, 0px, 0);
    transform: skew(0deg);
  }
}
@keyframes glitch-anim2 {
  0% {
    clip: rect(13px, 9999px, 42px, 0);
    transform: skew(0.41deg);
  }
  1% {
    clip: rect(56px, 9999px, 43px, 0);
    transform: skew(0.91deg);
  }
  2% {
    clip: rect(68px, 9999px, 6px, 0);
    transform: skew(0.27deg);
  }
  3% {
    clip: rect(38px, 9999px, 33px, 0);
    transform: skew(0.37deg);
  }
  4% {
    clip: rect(61px, 9999px, 49px, 0);
    transform: skew(0.32deg);
  }
  5% {
    clip: rect(98px, 9999px, 16px, 0);
    transform: skew(0.86deg);
  }
  6% {
    clip: rect(95px, 9999px, 51px, 0);
    transform: skew(0.56deg);
  }
  7% {
    clip: rect(96px, 9999px, 83px, 0);
    transform: skew(0.91deg);
  }
  8% {
    clip: rect(95px, 9999px, 90px, 0);
    transform: skew(0.75deg);
  }
  9% {
    clip: rect(42px, 9999px, 21px, 0);
    transform: skew(0.19deg);
  }
  10% {
    clip: rect(28px, 9999px, 24px, 0);
    transform: skew(0.77deg);
  }
  11% {
    clip: rect(71px, 9999px, 67px, 0);
    transform: skew(0.42deg);
  }
  12% {
    clip: rect(56px, 9999px, 70px, 0);
    transform: skew(0.04deg);
  }
  13% {
    clip: rect(61px, 9999px, 1px, 0);
    transform: skew(0.54deg);
  }
  14% {
    clip: rect(46px, 9999px, 80px, 0);
    transform: skew(0.47deg);
  }
  15% {
    clip: rect(14px, 9999px, 16px, 0);
    transform: skew(0.67deg);
  }
  16% {
    clip: rect(61px, 9999px, 86px, 0);
    transform: skew(0.18deg);
  }
  17% {
    clip: rect(42px, 9999px, 49px, 0);
    transform: skew(0.22deg);
  }
  18% {
    clip: rect(87px, 9999px, 67px, 0);
    transform: skew(0.28deg);
  }
  19% {
    clip: rect(86px, 9999px, 47px, 0);
    transform: skew(0.77deg);
  }
  20% {
    clip: rect(98px, 9999px, 100px, 0);
    transform: skew(0.91deg);
  }
  100% {
    clip: rect(98px, 9999px, 100px, 0);
    transform: skew(0.91deg);
  }
}
</style>
