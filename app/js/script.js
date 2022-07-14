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





// banner

const bannerInput = document.querySelector('.banner__input');
const bannerButton = document.querySelector('.banner__button');
const commentsTopTextarea = document.querySelector('.comments__top_textarea');
const commentsTopButton = document.querySelector('.comments__top_button');

if (commentsTopButton) {
    commentsTopButton.addEventListener('click', e => {
        e.preventDefault();
    
        activeModal();
    });
}

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

if (postSliderList && postSliderArrowLeft && postSliderArrowRight) {

    postSliderList.forEach((elem, index) => {
        elem.addEventListener('click', e => {
            translateXCounter = -100 * (index + 1);
    
            slider(postSliderImg);
        })
    });

    postSliderArrowLeft.addEventListener('click', e => {
        if (translateXCounter >= -100) {
            return;
        }
    
        translateXCounter += 100
    
        slider(postSliderImg);
    });

    postSliderArrowRight.addEventListener('click', e => {
        if (postSliderImg.length * -100 >= translateXCounter) {
            return;
        }
    
        translateXCounter -= 100;
    
        slider(postSliderImg);
    });

    slider(postSliderImg);

}



// modal

const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');

if (modal) {
    modal.addEventListener('click', e => {
        if (e.target.classList[0] == 'modal') {
            removeModal();
        }
    });
    
    modalClose.addEventListener('click', e => {
        removeModal();
    })
}

function activeModal() {
    modal.style.top = '0';
    modal.style.animation = 'blackout 1.5s forwards';
}

function removeModal() {
    modal.style.animation = '';
    modal.style.background = 'rgba(0, 0, 0, 0)';
    modal.style.top = '-100%';
}




// burger-menu

const headerFixedActive = document.querySelector('.header-fixed__active');
const asideClose = document.querySelector('.aside__close');
const aside = document.querySelector('.aside');

if (headerFixedActive && asideClose && aside) {
    aside.addEventListener('click', e => {
        if (e.target.classList[0] == 'aside') {
            removeMenu();
        }
    });

    headerFixedActive.addEventListener('click', e => activeMenu());

    asideClose.addEventListener('click', e => removeMenu());
}

function activeMenu() {
    aside.style.transform = 'translateX(0)';
    aside.style.animation = 'blackout 1s forwards';
}

function removeMenu() {
    aside.style.transform = 'translateX(-100%)';
    aside.style.animation = '';
}




// commments

const commentAnswer = document.querySelectorAll('.comment__answer');

commentAnswer.forEach(elem => {
    const buttonReply = elem.querySelector('.comment-user__reply');
    const commentsTextarea = elem.querySelector('.comments__textarea');
    const commentsUserAnswer = elem.querySelector('.comments-user__answer');
    const commentsButtonCancel = elem.querySelector('.comments__button_cancel');
    const commentsButtonReplay = elem.querySelector('.comments__button_replay');

    if (!elem) {
        return;
    }

    buttonReply.addEventListener('click', () => {
        commentsUserAnswer.style.display = 'block';

        commentsButtonCancel.addEventListener('click', () => {
            commentsUserAnswer.style.display = 'none';
        });
    
        commentsButtonReplay.addEventListener('click', () => {
            activeModal();
        });

        removeDisabledButton(commentsTextarea, commentsButtonReplay);
    })
})

const video = document.querySelector('.post__video-elem');
const videoStart = document.querySelector('.video__start');

if (videoStart) {
    videoStart.addEventListener('click', e => {
        videoStart.style.display = 'none';
        video.play();
        video.controls = true;
    })
}