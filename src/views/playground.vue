<template>
    <section class="playground-wrapper">
        <div class="element">
            <img src="https://www.thesprucepets.com/thmb/1kjJEzrw3adUl0TIOWuf24s5VPw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-909948608-5c69cd9446e0fb0001560d1a.jpg"
                alt="Image">
        </div>
        <div class="container-2">
            <h1>Playground</h1>
            <p>Here you can play with the components</p>
            <div class="action-btn action-btn-1 heart"><i class="fa-regular fa-heart"></i></div>
            <div class="action-btn action-btn-2 thumps-up"><i class="fa-regular fa-thumbs-up"></i></div>
            <div class="action-btn action-btn-3 share"><i class="fa-regular fa-share-from-square"></i></div>
            <div class="hidden-wrapper"></div>
        </div>
    </section>
</template>
<script>
export default {
    name: '',
    data() {
        return {

        }
    },
    created() {

    },
    mounted() {

    },
    methods: {

    },
    computed: {

    },
    components: {

    }
}
</script>
<style lang="scss">
.element {
    position: relative; // set the parent element to a relative position
    background-image: url('https://www.thesprucepets.com/thmb/1kjJEzrw3adUl0TIOWuf24s5VPw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-909948608-5c69cd9446e0fb0001560d1a.jpg');
}

.element::before {
    content: '';
    transition: opacity 0.3s;

    position: absolute; // position the pseudo-element absolutely inside the parent element
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
}

.element:hover::before {
    transition: opacity 0.3s;

    opacity: 1;
    background-color: rgba(0, 0, 255, 0.5); // change the background color on hover
}

.hidden-wrapper {
    width: 60px;
    min-height: 100px;
    position: absolute;
    top: -30px;
    left: -60px;
    cursor: auto;
    z-index: 0;
}

.action-btn {
    position: absolute;
    top: 5%;
    // Cubic option for opacity cubic-bezier(1,-0.17,.52,1.04)
    transition: transform 0.8s cubic-bezier(.42, .83, 0, 1.15), opacity 0.3s cubic-bezier(1, -0.17, .52, 1.04), color 0.2s ease-in-out;
    // width: 150px;
    // height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    opacity: 0;
    z-index: 1;
}

.playground-wrapper {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(115, 197, 224);
    color: rgb(62, 98, 115)
}

// div:has(> .action-btn) Same as .container-2 
div:has(> .action-btn) {
    position: relative;
    width: 320px;
    height: 200px;
    background-color: rgba(149, 225, 121, 0.646);
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(140, 149, 159, 0.2);
    backdrop-filter: blur(10px);
    z-index: 5;

    &:hover {

        .action-btn {
            opacity: 1;
            cursor: pointer;


            &:hover {
                color: white;
                background-color: rgba(149, 225, 121, 0.404);
            }
        }

        .action-btn-1 {
            transform: translate(-200%, -180%);
        }

        .action-btn-2 {
            transform: translate(-200%, -20%);
        }

        .action-btn-3 {
            transform: translate(-200%, 150%);
        }

        // @for $i from 1 through 5 {
        //     .action-btn-#{$i} {
        //         transform: translate(-50% * $i, -20% * $i);
        //         // font-size: 10px * $i;
        //     }
        // }

        cursor: pointer;


    }
}
</style>