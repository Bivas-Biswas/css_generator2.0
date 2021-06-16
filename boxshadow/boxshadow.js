// slider update function
function slider_color(ele){
    const curr = ele.value,
        min = parseInt(ele.getAttribute('min')),
        max = parseInt(ele.getAttribute('max'))
    const y = ((curr-min)/(max-min))*100
    ele.style.background = 'linear-gradient(90deg, rgb(156, 133, 210)' + y + '%, rgb(255 255 255)' + y + '%)'
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
        if(ifpx) {
            slider_label.innerHTML = `${this.value / val} px`
        }
        else {
            slider_label.innerHTML = `${this.value / val}`
        }
    }
}

// for Horizontal Shadow Length
const horizontal_slider = document.querySelector('#horizontal_slider')
const horizontal_label = document.querySelector('#horizontal_label')

slider_load(horizontal_slider, horizontal_label)

// for Vertical Shadow Length
const vertical_slider = document.querySelector('#vertical_slider')
const vertical_label = document.querySelector('#vertical_label')

slider_load(vertical_slider, vertical_label)

// for blur radius
const blur_radius_slider = document.querySelector('#blur_radius_slider')
const blur_radius_label = document.querySelector('#blur_radius_label')

slider_load(blur_radius_slider, blur_radius_label)

// for spread radius
const spread_radius_slider = document.querySelector('#spread_radius_slider')
const spread_radius_label = document.querySelector('#spread_radius_label')

slider_load(spread_radius_slider, spread_radius_label)

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
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            input: true,
            clear: true,
            save: true
        }
    }
});

const shadow_color = document.querySelector('#shadow_color_label')

// update current value
shadow_color.value = 'rgba(156, 133, 210, 1)'
shadow_color.style.color = 'rgba(156, 133, 210, 1)'

pickr.on('change', (...args) => {
    const active_color_format = document.querySelector('.pcr-type')
    if(active_color_format.classList.contains('active')) {
        let color = args[0].toHEXA().toString()
        shadow_color.value = color
        shadow_color.style.color = color
    }
    else {
        let color = args[0].toRGBA()
        let rgbaColor = `rgba(${color[0].toFixed(0)},${color[1].toFixed(0)},${color[2].toFixed(0)},${color[3].toFixed(2)})`
        shadow_color.value = rgbaColor
        shadow_color.style.color = rgbaColor
    }
})

// shadow color opacity
const shadow_color_opacity_slider = document.querySelector('#shadow_color_opacity_slider')
const shadow_color_opacity_label = document.querySelector('#shadow_color_opacity_label')

slider_load(shadow_color_opacity_slider, shadow_color_opacity_label, 100, false)

// inset

