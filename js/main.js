$(function () {
  // 關閉彈窗 #popup-clost-btn
  $("#popup-clost-btn").click(function () {
    $("#popup").fadeOut();
  });
  // 關閉彈窗 #popup 陰影
  $("#popup").on("click", function (e) {
    if (e.target === this) {
      $("#popup").fadeOut();
    }
  });

  // header hamburger
  $("#header-hamburger,#header nav a,#header .header-mask").click(function () {
    if (window.innerWidth < 1440) {
      $("#header").toggleClass("toggled");
    }
  });

  // sec2 slider
  const carouselData = [
    {
      num: "01",
      title: "車輛定位Tracking",
      desc: "即時掌握每台車輛位置，清晰的目視化設計讓您全盤掌握車輛狀態與駕駛資訊。",
    },
    {
      num: "02",
      title: "軌跡回放History",
      desc: "迅速掌握車輛每日的歷史軌跡與行駛里程，並可協助您篩選出每一起異常事件發生的時間、地點，過濾掉無用的資訊，幫助您執行有效率的管理。",
    },
    {
      num: "03",
      title: "電子圍籬Geo-Fense",
      desc: "可彈性編輯的多邊形電子圍籬，掌握車輛進出指定地點的時間、停留時長及造訪頻度，可協助您管理計畫外的異常停留。",
    },
    {
      num: "04",
      title: "任務派遣Despatch",
      desc: "簡化每日分派任務的工作，利用可視化看板即時掌握每個運送點的到達時間，並結合行動APP即時將每個任務計畫通知駕駛，大幅提升任務調度效率。",
    },
    {
      num: "05",
      title: "營運報表分析Dashboard",
      desc: "提供車輛稼動率、油耗數據、保養維修紀錄等。一次全盤掌握車隊營運狀況。",
    },
    {
      num: "06",
      title: "遠端診斷",
      desc: "與車輛電腦連線，偵測車輛錯誤碼(DTC, Diagnostic Trouble Code)並依緊急程度分為3個等級，指引管理者及駕駛故障應變方式。",
    },
    {
      num: "07",
      title: "Safety Sense Link",
      desc: "PCS 預警式防護系統與 LDWS車道偏移警示系統作動後，於個人電腦、行動裝置上警示，提醒管理者可能發生事故或危險駕駛行為。",
    },
    {
      num: "08",
      title: "智能保養",
      desc: "管理者可客製化設定保養週期提醒、線上保養預約，保養工單資料隔日回傳。",
    },
    {
      num: "09",
      title: "E-Coaching",
      desc: "將駕駛行為分為超速、怠速、油門踩踏、急加減速、經濟轉速等五項指標，供駕駛作為改善駕駛行為的有效指標。",
    },
  ];

  const slides = document.querySelectorAll(".slide");
  const textSection = document.getElementById("textSection");
  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateCarousel() {
    slides.forEach((slide, index) => {
      slide.classList.remove("active", "prev", "next");
      if (index === currentIndex) {
        slide.classList.add("active");
      } else if (index === (currentIndex - 1 + totalSlides) % totalSlides) {
        slide.classList.add("prev");
      } else if (index === (currentIndex + 1) % totalSlides) {
        slide.classList.add("next");
      }
    });
    updateTextContent(currentIndex);
  }

  function updateTextContent(index) {
    textSection.classList.add("fade-out");
    setTimeout(() => {
      document.getElementById("textNum").textContent = carouselData[index].num;
      document.getElementById("textTitle").textContent =
        carouselData[index].title;
      document.getElementById("textDesc").textContent =
        carouselData[index].desc;
      textSection.classList.remove("fade-out");
    }, 400);
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  document.getElementById("btnNext").addEventListener("click", nextSlide);

  document.getElementById("btnPrev").addEventListener("click", prevSlide);

  updateCarousel();

  // swipe event
  var sec2carousel = document.getElementById("sec2carousel");
  var mc = new Hammer(sec2carousel);
  mc.on("swipeleft", nextSlide);
  mc.on("swiperight", prevSlide);

  // sec3 img display
  const sec3cards = document.querySelectorAll(".sec3-card");
  const images = document.querySelectorAll(".sec3-img-placeholder");
  let sec3currentIndex = 0;
  let autoPlayInterval;
  const intervalTime = 2000; // 每 4 秒自動切換一次 (可依需求調整)

  // 切換至指定索引的功能
  function switchTab(index) {
    // 1. 移除所有 active 狀態
    sec3cards.forEach((card) => card.classList.remove("active"));
    images.forEach((img) => img.classList.remove("active"));

    // 2. 為目標加上 active 狀態
    sec3cards[index].classList.add("active");
    images[index].classList.add("active");

    // 3. 更新當前索引
    sec3currentIndex = index;
  }

  // 啟動自動輪播
  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      let nextIndex = (sec3currentIndex + 1) % sec3cards.length;
      switchTab(nextIndex);
    }, intervalTime);
  }

  // 停止自動輪播
  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // 綁定點擊事件
  sec3cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      // 使用者手動點擊時，先暫停原本的計時器，切換後再重新啟動，避免剛點擊就馬上又自動換圖
      stopAutoPlay();
      switchTab(index);
      startAutoPlay();
    });
  });

  // 網頁載入後啟動自動輪播
  startAutoPlay();

  // faq tabs 切換類別
  $("#faq-tabs li").click(function () {
    $(this).addClass("active").siblings("li").removeClass("active");
    let $index = $(this).index();
    $("#sec6 .faq-section").hide();
    $("#sec6 .faq-section").eq($index).show();
  });

  // faq toggle 類別展開
  $("#sec6 .section-toggle-row").click(function () {
    $(this).toggleClass("toggled");
    $(this).siblings(".faq-list").slideToggle();
  });

  // faq toggle 問題
  $("#sec6 .faq-list .q-main").click(function () {
    $(this).parent().toggleClass("toggled");
    $(this).siblings(".a-row").slideToggle();
  });
});
