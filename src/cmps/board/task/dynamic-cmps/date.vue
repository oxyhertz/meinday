<template>
    <section class="date-preview-container">
        <VueDatePicker auto-apply v-model="date" :enable-time-picker="false">
            <template #trigger>
                <span class="date-title">{{ dateStr }}</span>
            </template>
            <template #arrow-left>
                <svg viewBox="0 0 20 20" fill="currentColor" width="24" height="24" aria-hidden="true"
                    class="icon_component icon_component--no-focus-style">
                    <path
                        d="M17.8921 10.071C17.8921 10.4853 17.5563 10.821 17.1421 10.821L4.81065 10.821L9.43897 15.4494C9.73186 15.7423 9.73186 16.2171 9.43897 16.51C9.14608 16.8029 8.6712 16.8029 8.37831 16.51L2.46966 10.6014C2.17677 10.3085 2.17677 9.83361 2.46966 9.54071L8.37831 3.63207C8.67121 3.33917 9.14608 3.33917 9.43897 3.63207C9.73187 3.92496 9.73187 4.39983 9.43897 4.69273L4.81065 9.32104L17.1421 9.32104C17.5563 9.32104 17.8921 9.65683 17.8921 10.071Z"
                        fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                </svg>
            </template>
            <template #arrow-right>
                <svg viewBox="0 0 20 20" fill="currentColor" width="24" height="24" aria-hidden="true"
                    class="icon_component icon_component--no-focus-style">
                    <path
                        d="M2.24999 10.071C2.24999 9.65683 2.58578 9.32104 2.99999 9.32104L15.3315 9.32105L10.7031 4.69273C10.4103 4.39983 10.4103 3.92496 10.7031 3.63207C10.996 3.33917 11.4709 3.33917 11.7638 3.63207L17.6725 9.54071C17.9653 9.83361 17.9653 10.3085 17.6725 10.6014L11.7638 16.51C11.4709 16.8029 10.996 16.8029 10.7031 16.51C10.4103 16.2171 10.4103 15.7423 10.7031 15.4494L15.3315 10.821L2.99999 10.821C2.58578 10.821 2.24999 10.4853 2.24999 10.071Z"
                        fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                </svg>
            </template>
        </VueDatePicker>
    </section>
</template>
<script >
export default {
    name: 'date',
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            date: null
        }
    },
    created() {
        if (this.task.date) this.date = new Date(this.task.date)
    },
    computed: {
        dateStr() {
            // retturn Month full and day in number
            if (!this.date) return ''
            const month = this.date.toLocaleString('default', { month: 'long' });
            const day = this.date.getDate();

            return month + ' ' + day
        }
    },
    watch: {
        date() {
            const copyTask = JSON.parse(JSON.stringify(this.task))
            copyTask.date = this.date
            this.$store.dispatch({ type: 'updateTask', task: copyTask, isSetCurrTask: false })
        }

    }
}
</script>
<style lang="scss">
.date-preview-container {
    height: 100%;


    .date-title {

        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.dp__instance_calendar .dp__menu_inner {
    font-family: Figtree, Roboto, Rubik, Noto Kufi Arabic, Noto Sans JP;
    font-weight: 300;
    color: #323338;
    padding: 26px;

    .dp__calendar_header,
    .dp__calendar_item {
        color: #323338;

    }


    .dp__calendar_header_separator {
        display: none;
    }

    .dp__cell_inner {
        border-radius: 50%;
        // background-color: transparent;
        // color: inherit;

    }

    .dp__active_date {
        background-color: #0073ea;
    }

    .dp__calendar_header_item {
        font-size: 12px;
        font-weight: 300;
    }

    .dp__month_year_wrap {
        align-items: center;
        justify-content: center;

        button {
            padding: 0;
            width: auto;
            font-weight: 500;
        }

        .dp__btn.dp__month_year_select {
            margin-inline-end: 4px;
        }
    }

    .dp__btn.dp__month_year_col_nav,
    .dp__btn.dp__month_year_col_nav {
        padding: 0;

        .dp__inner_nav {
            &:hover {
                background-color: transparent;
                color: #323338;
            }
        }
    }

}
</style>