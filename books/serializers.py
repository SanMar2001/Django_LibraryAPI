from .models import Book, Store, Card, Sale, Reservation, Devolution, Chat, Message
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

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['id', 'client', 'number', 'name', 'cv', 'cadYear', 'cadMonth', 'wallet']

class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = ['id', 'book', 'client', 'date', 'delivered', 'returned']

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['id', 'book', 'client', 'expired', 'date']

class DevolutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Devolution
        fields = ['id', 'sale', 'description', 'image', 'validated', 'date']

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ['id', 'admin', 'client', 'closed']

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'content', 'user', 'usertype', 'date', 'chat']
