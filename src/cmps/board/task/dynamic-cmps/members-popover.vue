<template>
    <div class="members-popover">
        <div class="active-members-container">
            <div class="active-member-preivew" v-for="member in task.members" :key="member._id">
                <img :src="member.imgUrl" alt="user-picture">
                <p>
                    <span>{{ member.fullname }}</span>
                <div class="icon-wrapper" @click="removeMember(member)">
                    <i class="fa-solid fa-x fa-2xs"></i>
                </div>
                </p>
            </div>
        </div>
        <div class="member-search-container">
            <input ref="input" v-model="filterByTxt" v-focus type="text" placeholder="Search names, roles or teams">
            <search-icon />
        </div>
        <div class="suggested-people-container">
            <p>Suggested people</p>
            <div>
                <div class="suggested-member" v-for="member in suggestedMembers" :key="member._id" @click="addUser(member)">
                    <img :src="member.imgUrl" alt="user-picture">
                    <p>{{ member.fullname }}</p>
                </div>
            </div>
        </div>
        <div class="invite-member-container">
            <invite-icon />
            <p>Invite a new member by email</p>

        </div>
    </div>
</template>
<script>
import searchIcon from '../../../icons/search-icon.vue';
import inviteIcon from '../../../icons/invite-person.vue';
export default {
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            filterByTxt: ''
        }
    },
    mounted() {
        // little delay to make sure popper is on
        setTimeout(() => {
            this.$refs.input.focus()
        }, 10);
    },
    methods: {
        removeMember(member) {
            this.$emit('removeMember', member)
        },
        addUser(member) {
            this.$emit('addUser', member)
        }
    },
    computed: {
        suggestedMembers() {
            const board = this.$store.getters.board
            const members = board.members.filter(member => !this.task.members.some(m => member._id === m._id))
            if (this.filterByTxt) return members.filter(member => member.fullname.toLowerCase().includes(this.filterByTxt.toLowerCase()))
            return members
        }
    },
    components: {
        searchIcon,
        inviteIcon
    }
}

</script>
<style lang="scss">
.members-popover {
    width: 360px;
    padding: 10px 20px;

    .active-member-preivew {
        display: flex;
        align-items: center;
        margin-block-end: 10px;
        margin-inline-start: -16px;

        img {
            width: 22px;
            height: 22px;
            position: relative;
            display: flex;
            border-radius: 50%;
            border: 2px solid white;
            left: 15px;
        }

        p {
            background-color: #e5f4ff;
            border: 1px solid #f7f7f7;
            color: #333;
            border-radius: 24px;
            font-size: 12px;
            font-weight: 400;
            height: 22px;
            padding-inline-start: 15px;
            display: flex;
            align-items: center;

            span {
                margin-inline-end: 6px;
            }

            .icon-wrapper {
                color: #333;
                margin-inline-end: 4px;
                cursor: pointer;
                width: 12px;
                height: 12px;
                display: flex;
                align-items: center;
                justify-content: center;

                &:hover {
                    background-color: white;
                    border-radius: 50%;

                }
            }



        }
    }

    .member-search-container {
        position: relative;
        margin-block-start: 20px;

        svg {
            position: absolute;
            top: 25%;
            right: 6px;
        }

        input {
            line-height: 22px;
            padding: 8px 24px 8px 16px;
            width: 100%;
            height: 100%;
            outline: 0;
            background-color: rgba(0, 0, 0, 0);
            border: 1px solid;
            transition: border-color 100ms ease-in;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            border-radius: 4px;
            border-color: #e6e9ef;
            font-family: Figtree, Roboto, Rubik, Noto Kufi Arabic, Noto Sans JP,
                sans-serif;

            &:hover {
                border-color: #323338;
            }

            &:focus {
                border-color: #0073ea;

            }
        }
    }

    .suggested-people-container {
        margin-block-start: 20px;
        color: #676879;

        .suggested-member {
            display: flex;
            align-items: center;

            padding: 8px;
            cursor: pointer;
            border-radius: 4px;

            img {
                width: 26px;
                height: 26px;
                display: flex;
                border-radius: 50%;
                border: 1 px solid white;
            }

            p {
                color: #323338;
                margin-inline-start: 10px;
            }

            &:hover {
                background-color: #dcdfec;
            }
        }
    }

    .invite-member-container {
        margin-block-start: 10px;
        padding: 8px;
        width: 100%;
        border-radius: 4px;
        display: flex;
        align-items: center;
        overflow: hidden;
        cursor: pointer;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;

        p {
            color: #323338;
            margin-inline-start: 10px;
        }

        svg {
            fill: #323338;
        }

        &:hover {
            background-color: #dcdfec;
        }
    }
}
</style>