<template lang="">
  <section class="msg-container">
    <div class="msg-header">
      <div class="user-avatar flex">
        <img :src="msg.byMember.imgUrl" alt="user profile pic" />
      </div>
      <p class="user-fullname">{{ msg.byMember.fullname }}</p>
      <div class="extra-info">
        <time-icon />
        <p class="relative-time">{{ relatedTime() }}</p>
        <bell-icon />
        <pulse-menu-button />
      </div>
    </div>
    <div class="msg-content" v-html="msg.content"></div>
    <footer>
        <div>
            <button>
                <likeIcon />
                <span>Like</span>
            </button>
        </div>
        <div>
            <button>
                <replyIcon />
                <span>Reply</span>
            </button>
        </div>
    </footer>
  </section>
</template>
<script>
import bellIcon from '../../icons/bell-icon.vue'
import timeIcon from '../../icons/time-icon.vue'
import likeIcon from '../../icons/like-icon.vue'
import replyIcon from '../../icons/reply-icon.vue'
import pulseMenuButton from '../../pulse-menu-button.vue'
import { utilService } from '../../../services/util.service.js'
export default {
    props: {
        msg: {
            type: Object,
            required: true,
        },
    },
    name: '',
    data() {
        return {}
    },
    methods: {
        relatedTime() {
            return utilService.relativeTimeString(this.msg.createdAt)
        },
    },
    components: {
        bellIcon,
        timeIcon,
        pulseMenuButton,
        likeIcon,
        replyIcon,
    },
}
</script>
<style scoped>
.msg-container {
    margin-block-end: 16px;
}

.msg-header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-block-end: 16px;
    padding: 16px 16px 8px 16px;
}

.user-avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
    object-fit: cover;
}

.extra-info {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    gap: 5px;
}

.pulse-menu-btn {
    display: flex;
    justify-content: center;
    align-items: center;
}

.user-fullname {
    font-weight: 400;
}

.msg-content {
    font-size: 16px;
    padding: 0 16px 8px 16px;
}

footer {
    display: flex;
    border-top: 1px solid #c3c6d4;
}

footer div {
    flex-basis: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

footer div:first-child {
    border-right: 1px solid #c3c6d4;

}

footer button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    width: 100%;
    font-size: 16px;
}
</style>
