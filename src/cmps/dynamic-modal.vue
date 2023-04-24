<template>
    <section class="dynamic-popper">
        <VDropdown>
            <slot name="trigger">
                <button class="trigger">Click me</button>
            </slot>
            <!-- This will be the popover target (for the events and position) -->

            <!-- This will be the content of the popover -->
            <template #popper>
                <section class="dynamic-modal">

                </section>
                <h1 v-close-popper> Dynamic Modal</h1>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit eos officiis unde iure, deserunt hic in fugiat
                ducimus perferendis deleniti possimus minima rem quia placeat, perspiciatis quisquam non! Ex, nam sapiente
                harum at impedit earum magnam, temporibus a accusamus quam eligendi facere veritatis vitae deleniti.
                Quisquam nulla dolor libero numquam at iusto earum placeat eum asperiores tempore. Et similique possimus
                iste delectus cupiditate adipisci aut vero praesentium neque, culpa, temporibus necessitatibus unde
                consequuntur natus quasi nobis dolore minima nemo quam aliquid eaque! Reiciendis expedita voluptates
                doloribus accusantium unde, suscipit magni quas quisquam fuga doloremque quos harum tenetur deserunt dolore,
                libero praesentium, mollitia ipsum. Perferendis eos est quisquam illo quidem ipsa ea, nobis fuga odio dolore
                possimus ipsam reprehenderit officia tenetur recusandae laborum exercitationem quae sint doloribus sapiente
                quos accusamus sed repudiandae. Maiores, quis tempora labore minima reprehenderit voluptates consectetur
                sapiente aliquid sunt vero quibusdam cupiditate. Quidem illum, odit quia aspernatur atque error cupiditate
                optio minus voluptate deleniti obcaecati, cumque a sequi accusantium dolorum temporibus iure cum non. Alias
                sed necessitatibus quod hic sit? Assumenda vel adipisci ipsa repellendus ut numquam accusamus delectus
                quaerat porro, corporis quia voluptatum ullam quam. Voluptatem aperiam facere quasi quis doloremque non
                animi, placeat dolor, a repudiandae odit quisquam consequatur dolorem nam quas. Eos illo voluptatem, soluta
                fugit pariatur dolore, accusantium vitae recusandae, eius in nisi maiores quisquam obcaecati quo architecto?
                Distinctio velit officia ea impedit totam magnam, praesentium, repellendus nihil expedita exercitationem,
                eaque inventore quis harum minima neque. Ipsa, libero error. Quos dolore tenetur, tempora consequuntur unde
                ea culpa optio exercitationem minus laudantium atque error quia assumenda maiores ratione a. Similique
                tempore doloribus perspiciatis laudantium assumenda corporis, minima reiciendis odio ut obcaecati omnis
                nihil suscipit corrupti quisquam voluptate cumque natus explicabo ipsum autem, ullam ipsam fugit? Dolore
                dolorum autem maxime expedita, nemo sapiente rem officia, labore explicabo dolorem numquam doloribus nam
                obcaecati? Expedita officiis culpa at illum. Possimus facilis maxime commodi sint dicta consequatur veniam,
                nam, omnis magnam officiis, soluta aut ab porro eveniet assumenda error voluptatibus deleniti ea sapiente
                accusantium officia voluptate! Autem veritatis quam velit minus minima omnis sint saepe. Reprehenderit
                accusantium consequatur voluptatibus, mollitia sunt quis adipisci molestiae maxime vitae distinctio ex
                exercitationem harum ut tenetur aliquam quo. Optio quibusdam necessitatibus est exercitationem sapiente
                omnis voluptates autem, vel iure modi eligendi iste aliquid expedita, adipisci non animi doloribus tempora
                soluta molestias dignissimos rerum. Maxime minima, nobis laborum, provident animi quasi minus aspernatur
                consequatur sapiente quod iste expedita, cum aperiam. Deserunt hic dolor corrupti commodi possimus
                accusantium cumque. Tempore amet quis, provident non voluptas ullam explicabo recusandae repellat ipsum
                quaerat aut modi similique aspernatur atque voluptatibus impedit dignissimos mollitia aperiam corporis!
                Harum voluptatem, cumque eius, excepturi fuga quibusdam mollitia non quam quod accusamus ab iure animi.
                Deleniti quaerat itaque, atque earum assumenda ad doloremque consequuntur tempora dolore? Similique
                provident saepe culpa est corporis ut veritatis quibusdam eligendi, accusamus esse ipsum quo aliquid, animi
                eveniet vitae quam dolore laborum sit dolorum exercitationem nostrum. Error tenetur dolorum, expedita
                laborum voluptates nemo ipsum laudantium corrupti praesentium.
            </template>
        </VDropdown>
    </section>
</template>
<script>
export default {
    name: 'dynamic-modal'
}
</script>

<style >
.v-popper--theme-dropdown .v-popper__inner {
    background: black;
}

.dynamic-modal {
    color: #172b4d;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    border-radius: 3px;
    box-shadow: var(--ds-shadow-overlay, 0 8px 16px -4px rgba(9, 30, 66, .25), 0 0 0 1px rgba(9, 30, 66, .08));
    box-sizing: border-box;
    outline: 0;
}

.dynamic-popper {
    display: inline-block;
}

button.trigger {
    display: inline-block;
}
</style>
