from .models import Book, Store
from rest_framework import serializers

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id','store', 'title', 'author', 'pubYear', 'gender', 'pages', 'editorial',
                  'issbn', 'language', 'pubDate', 'condition', 'price', 'reserved', 'sold','image']
        
class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ['id', 'address', 'schedule']
