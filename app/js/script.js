function throttle(func, ms) {

    let locked = false

    return function() {

      if (locked) return

      const context = this
      const args = arguments

      locked = true

      setTimeout(() => {

        func.apply(context, args)
        locked = false

      }, ms)

    }
}

function debounce(func, ms) {
    return function (args) {
      let previousCall = this.lastCall;
      this.lastCall = Date.now();
      if (previousCall && ((this.lastCall - previousCall) <= ms)) {
        clearTimeout(this.lastCallTimer);
      }
      this.lastCallTimer = setTimeout(() => func(args), ms);
    }
}

function removeDisabledButton(input, button) {
    if (!input) {
        return;
    }

    if (!button) {
        return;
    }

    input.oninput = throttle(() => {
        if (input.value.length >= 5) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
    }, 100)
}





const bannerInput = document.querySelector('.banner__input');
const bannerButton = document.querySelector('.banner__button');
const commentsTopTextarea = document.querySelector('.comments__top_textarea');
const commentsTopButton = document.querySelector('.comments__top_button');

removeDisabledButton(commentsTopTextarea, commentsTopButton);
removeDisabledButton(bannerInput, bannerButton);




// slider

const postSlider = document.querySelector('.post__slider');
const postSliderArrowLeft = document.querySelector('.post__slider_arrow');
const postSliderArrowRight = document.querySelector('.post__slider_arrow_right');
const postSliderImg = document.querySelectorAll('.post__slider_img');
const postSliderLists = document.querySelector('.post__slider_lists');
let translateXCounter = -100;

// render switch items

for (let i = 0; i < postSliderImg.length; i++) {
    postSliderLists.insertAdjacentHTML('afterbegin', '<li class="post__slider_list"></li>');
}

const postSliderList = document.querySelectorAll('.post__slider_list');

function slider(slides) {
    let counterSlide = translateXCounter

    slides.forEach(elem => {
        elem.style = `transform: translateX(${counterSlide+=100}%);`
    })

    let counterSlideItem = translateXCounter / -100 - 1;

    postSliderList.forEach((elem, index) => {
        if (elem.classList.contains('_active')) {
            elem.classList.remove('_active');
        }

        if (index === counterSlideItem) {
            elem.classList.add('_active');
        }
    })
}

postSliderList.forEach((elem, index) => {
    elem.addEventListener('click', e => {
        translateXCounter = -100 * (index + 1);

        slider(postSliderImg);
    })
})

postSliderArrowLeft.addEventListener('click', e => {
    if (translateXCounter >= -100) {
        return;
    }

    translateXCounter += 100

    slider(postSliderImg);
})

postSliderArrowRight.addEventListener('click', e => {
    if (postSliderImg.length * -100 >= translateXCounter) {
        return;
    }

    translateXCounter -= 100;

    slider(postSliderImg);
})

slider(postSliderImg);