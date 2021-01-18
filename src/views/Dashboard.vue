<template>
  <div id="dashboard">
    <section>
      <div class="col1">
        <div class="profile">
          <h5>{{ userProfile.name }}</h5>
          <p>{{ userProfile.title }}</p>
          <div class="create-post">
            <p>create a post</p>
            <form @submit.prevent>
              <textarea v-model.trim="post.content"></textarea>
              <button @click="createPost()" :disabled="post.content === ''" class="button">post</button>
            </form>
          </div>
        </div>
      </div>
       <div class="col2">
        <div v-if="posts.length">
          <div v-for="post in posts" :key="post.id" class="post">
            <h5>{{ post.userName }}</h5>
            <p>{{ post.content | trimLength }}</p>
            <ul>
              <li><a @click="toggleCommentModal(post)">comments {{ post.comments }}</a></li>
              <li><a @click="likePost(post)"><font-awesome-icon :icon="[toggleIcon(post), 'thumbs-up']" /> {{ post.likes }}</a></li>
              <li><a @click="viewPost(post)">view full post</a></li>
            </ul>
            <div :ref="post.id" hidden><p>This is a comment</p></div>
          </div>
        </div>
        <div v-else>
          <p class="no-results">There are currently no posts</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import * as fb from '../firebase';

export default {
  data() {
    return {
      post: {
        content: '',
        showComment:false,
      }
    }
  },
  computed: {
    ...mapState(['userProfile', 'posts'])
  },
  methods: {
    createPost() {
      this.$store.dispatch('createPost', { content: this.post.content })
      this.post.content = ''
    },
    toggleCommentModal(post){
      this.showComment=true;
      this.$refs[post.id][0].hasAttribute('hidden') ? this.$refs[post.id][0].removeAttribute('hidden') : this.$refs[post.id][0].setAttribute('hidden','hidden');
     console.log(this.$refs[post.id])
    },
    likePost(post){
      this.$store.dispatch('likePost',post);
    },
    viewPost(post){  
       this.$store.commit('setPost',post);
      this.$router.push(`post/${post.id}`);
   
    },
    toggleIcon(post){
     return post.likes.usersID.includes(fb.auth.currentUser.uid)?'fas':'far'
      // if(liked){
      //   return 'fas';
      // }else {
      //   return 'far'
      // }
    }
  },
  filters: {
  trimLength: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.length > 20 ? value.slice(0,20)+"..." : value
  }
  }
}
</script>

<style lang="scss" scoped>

</style>