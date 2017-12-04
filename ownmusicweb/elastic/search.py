from elasticsearch_dsl.connections import connections
from elasticsearch_dsl import DocType, Text, Date
from elasticsearch.helpers import bulk
from elasticsearch import Elasticsearch
from . import models
from .search import BlogPostIndex

connections.create_connection()

class BlogPostIndex(DocType):
    author = Text()
    posted_date = Date()
    title = Text()
    text = Text()

    class Meta:
        index = 'blogpost-index'

def bulk_indexing():
    BlogPostIndex.init()
    es = Elasticsearch()
    bulk(client=es, actions=(b.indexing() for b in models.BlogPost.objects.all().iterator()))

# Add indexing method to BlogPost
def indexing(self):
   obj = BlogPostIndex(
      meta={'id': self.id},
      author=self.author.username,
      posted_date=self.posted_date,
      title=self.title,
      text=self.text
   )
   obj.save()
   return obj.to_dict(include_meta=True)
