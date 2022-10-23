// 文字移入高亮
(function () {
  //1 为ul添加鼠标事件 使用实践冒泡
  let ul = document.querySelector('#nav_ul');
  ul.addEventListener('mouseover', e => {
    // console.log(e.target.nodeName);
    if (e.target.nodeName === 'LI') {
      //2 为li去除active类
      let active = ul.querySelector('.active');
      active.classList.remove('active');
      //3 选中的添加active
      // console.log(e);
      e.target.className = 'active';
    }
  });
})();

//显示banner左侧边栏
(function () {
  // 显示banner左侧栏只需要给对应li添加高度类 .height 即可
  //获取show里面的li
  let lis = document.querySelectorAll('.all-class .show>li');
  for (let i = 0; i < lis.length; i++) {
    lis[i].addEventListener('mouseenter', () => {
      // console.log(i);
      let h = document.querySelector('.height');
      // console.log(h);
      // 移除高度
      if (h) h.classList.remove('height');
      let ul = lis[i].querySelector('ul');
      ul.classList.add('height');
    });
  }
  //移除banner左侧栏隐藏
  for (let i = 0; i < lis.length; i++) {
    lis[i].addEventListener('mouseleave', () => {
      let h = document.querySelector('.height');
      // console.log(h);
      // 移除高度
      if (h) h.classList.remove('height');
    });
  }
})();

//轮播图
(function () {
  // 获取轮播图的ul
  let ul = document.querySelector('#publish-copy');
  // 获取轮播图中的li
  let lis = ul.querySelectorAll('li');
  //获取圆点 父节点 通过冒泡实现
  let dot = document.querySelector('#b_dot');
  let as = dot.querySelectorAll('a');
  // console.log(lis);
  let index = 0;
  // 定义一个计数器来实现自动轮播的效果
  let timeID = setInterval(anime, 3000);
  // 点击圆点实现更换
  dot.addEventListener('click', e => {
    // 点击a才生效
    if (e.target.nodeName === 'A') {
      //获取当前圆点 on
      dot.querySelector('.on').classList.remove('on');
      e.target.classList.add('on');
      // console.log(index);
      // console.log(e.target.dataset.dot );
      for (let i = 0; i < lis.length; i++) {
        lis[i].style.display = 'none';
      }
      index = e.target.dataset.dot;
      lis[index].style.display = 'block';
    }
  });
  ul.addEventListener('mouseenter', () => {
    // console.log('123');
    clearInterval(timeID);
  });
  ul.addEventListener('mouseleave', () => {
    clearInterval(timeID);
    // console.log('312');
    timeID = setInterval(anime, 3000);
  });
  function anime() {
    dot.querySelector('.on').classList.remove('on');
    index++;
    // console.log(index);
    for (let i = 0; i < lis.length; i++) {
      lis[i].style.display = 'none';
    }
    index = index >= lis.length ? 0 : index;
    lis[index].style.display = 'block';
    as[index].classList.add('on');
  }
})();

//直播课倒计时显示 修改直播课时间为 2022.10.28 15：00  添加一个定时器
(function () {
  count();
  let timeID = setInterval(() => {
    //当到达时间计时器停止
    if (diffirDate() <= 1) {
      clearInterval(timeID);
    } else {
      count();
    }
  }, 1000);

  // 将渲染封装起来
  function count() {
    let differ = diffirDate();
    // console.log(differ);
    if (differ >= 1) {
      // 转换为天
      let d = parseInt(differ / (1000 * 3600 * 24));
      // console.log(d);
      // 转换为小时
      let h = parseInt(differ / (1000 * 3600) - d * 24);
      // console.log(h);
      // 转换为分钟
      let m = parseInt((differ / (1000 * 3600) - d * 24 - h) * 60);
      // console.log(m);
      // 转换为秒
      let s = parseInt(((differ / (1000 * 3600) - d * 24 - h) * 60 - m) * 60);
      // console.log(s);

      // 获取页面结点并将其渲染
      document.querySelector('#_d').innerHTML = zero(d);
      document.querySelector('#_h').innerHTML = zero(h);
      document.querySelector('#_m').innerHTML = zero(m);
      document.querySelector('#_s').innerHTML = zero(s);
    }
  }
  // 定义一个计算时间戳函数
  function diffirDate() {
    let book = document.querySelector('.start_time span');
    // console.log(book.innerText);
    // 切割字符串 把时间String转换为Date型
    let arrBook = book.innerText.split(' ');
    // 把时间2022.10.28 转换为2022-10-28
    let book_date = arrBook[0].replace(/\./g, '-');
    // console.log(book_date);
    let date = +new Date(book_date + ' ' + arrBook[1]);
    // console.log(date);
    let date1 = +new Date();
    // console.log(date1);

    return date - date1;
  }
  // 定义一个补零函数
  function zero(time) {
    return time < 10 ? '0' + time : time;
  }
})();
