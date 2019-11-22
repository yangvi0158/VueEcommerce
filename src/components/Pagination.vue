<template>
    <div class="paginationNav">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item" :class="{'disabled': !pages.has_pre}">
              <a class="page-link" href="#" aria-label="Previous" @click.prevent="sendToParent(pages.current_page-1)">
                <span aria-hidden="true">&lsaquo;</span>
                <span class="sr-only">Previous</span>
              </a>
            </li>
            <li v-for="page in pages.total_pages" :key="page" :class="{'active': pages.current_page === page}" class="page-item">
              <a class="page-link" href="#" @click.prevent="sendToParent(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{'disabled': !pages.has_next}">
              <a class="page-link" href="#" aria-label="Next" @click.prevent="sendToParent(pages.current_page+1)">
                <span aria-hidden="true">&rsaquo;</span>
                <span class="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
    </div>
</template>

<script>

export default{
    name: 'Pagination',
    props: ['pages'],
    methods: {
        sendToParent(page){
            this.$emit('updatepage', page);
        },
    },
}

</script>