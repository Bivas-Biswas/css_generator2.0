const showcase = document.querySelector('.showcase')
const css_code =document.querySelector('.show_css_code p')

const horizontal_slider = document.querySelector('#horizontal_slider')
const horizontal_label = document.querySelector('#horizontal_label')

const vertical_slider = document.querySelector('#vertical_slider')
const vertical_label = document.querySelector('#vertical_label')

const blur_radius_slider = document.querySelector('#blur_radius_slider')
const blur_radius_label = document.querySelector('#blur_radius_label')

const spread_radius_slider = document.querySelector('#spread_radius_slider')
const spread_radius_label = document.querySelector('#spread_radius_label')

const shadow_opacity_slider = document.querySelector('#shadow_color_opacity_slider')
const shadow_opacity_label = document.querySelector('#shadow_color_opacity_label')

const shadow_color = document.querySelector('#shadow_color_label')

const inset_on_off =document.querySelector('#inset_check_on_off')

// for shadow color
// Simple example, see optional options for more configuration.
const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'nano', // or 'monolith', or 'nano'
    default: 'rgb(156, 133, 210)',
    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],

    components: {

        // Main components
        preview: true,
        // opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            // hex: true,
            rgba: true,
            input: true,
            clear: true,
            save: true
        }
    }
});

// update current value
shadow_color.value = `rgb(156, 133, 210)`
shadow_color.style.color = `rgba(156, 133, 210, ${shadow_opacity_slider.value})`

let rgbColor='rgb(156, 133, 210';
let boxShadow;

pickr.on('change', (...args) => {
    let color = args[0].toRGBA()

    rgbColor = `rgba(${color[0].toFixed(0)},${color[1].toFixed(0)},${color[2].toFixed(0)}`

    let rgbaColor = `${rgbColor},${parseInt(shadow_opacity_slider.value)/100})`

    shadow_color.value = `rgb(${color[0].toFixed(0)}, ${color[1].toFixed(0)}, ${color[2].toFixed(0)})`
    shadow_color.style.color = rgbaColor

    boxShadow = `${inset_on_off.checked ? `inset`: ''} ${horizontal_slider.value}px ${vertical_slider.value}px ${blur_radius_slider.value}px ${spread_radius_slider.value}px ${rgbColor},${parseInt(shadow_opacity_slider.value)/100})`

    showcase.style.boxShadow = boxShadow
    css_code.textContent = `box-shadow: ${boxShadow};`
})

// slider update function
function slider_color(ele){
    const curr = ele.value,
        min = parseInt(ele.getAttribute('min')),
        max = parseInt(ele.getAttribute('max'))
    const y = ((curr-min)/(max-min))*100
    // console.log(shadow_opacity_slider.value)
    ele.style.background = 'linear-gradient(90deg, rgb(156, 133, 210)' + y + '%, rgb(255 255 255)' + y + '%)'
    boxShadow = `${inset_on_off.checked ? `inset`: ''} ${horizontal_slider.value}px ${vertical_slider.value}px ${blur_radius_slider.value}px ${spread_radius_slider.value}px ${rgbColor}, ${parseInt(shadow_opacity_slider.value)/100})`
    showcase.style.boxShadow =  boxShadow
    css_code.textContent = `box-shadow: ${boxShadow};`
}

// update slider color and label value, according to the slider value
function slider_load(sliderName, slider_label , val=1, ifpx=true){

    if(ifpx){
        slider_label.innerHTML = `${sliderName.value/val} px`
    }
    else{
        slider_label.innerHTML = `${sliderName.value/val}`
    }

    if(sliderName.value !==0){
        slider_color(sliderName)
    }
    sliderName.addEventListener('input', function (){
        slider_color(this)
    })

    sliderName.oninput = function (){
        if(ifpx)
            slider_label.innerHTML = `${this.value / val} px`

        else
            slider_label.innerHTML = `${this.value / val}`
    }
}

// upadte current value
slider_load(horizontal_slider, horizontal_label)
slider_load(vertical_slider, vertical_label)
slider_load(blur_radius_slider, blur_radius_label)
slider_load(spread_radius_slider, spread_radius_label)
slider_load(shadow_opacity_slider, shadow_opacity_label, 100, false)

//
inset_on_off.onclick = function (){
    console.log(inset_on_off.checked ? boxShadow = `inset ${boxShadow}`: boxShadow = boxShadow.replace('inset', ''))
    // console.log(boxShadow)
    showcase.style.boxShadow =  boxShadow
    css_code.textContent = `box-shadow: ${boxShadow};`

}

// copy button
function copyElementText(id) {
    let text = document.querySelector(id).innerText;
    let elem = document.createElement("textarea");
    document.body.appendChild(elem)
    elem.value = text;
    elem.select();
    document.execCommand("copy")
    document.body.removeChild(elem)
}

const copyButton = document.querySelector('#copy_btn')
copyButton.onclick = function(){
    copyElementText('#css_code')
}


