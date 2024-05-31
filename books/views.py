from .serializers import BookSerializer, StoreSerializer, CardSerializer, SaleSerializer, DevolutionSerializer, ReservationSerializer, ChatSerializer, MessageSerializer
from django.http import JsonResponse
from .models import Book, Store, Card, Sale, Devolution, Reservation, Chat, Message
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView

# Create your views here.
class BookView(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.filter(reserved=False, sold=False).order_by('-pubDate')

class StoreView(viewsets.ModelViewSet):
    serializer_class = StoreSerializer
    queryset = Store.objects.all()

class NewsView(APIView):
    permission_classes = [AllowAny]
    #Método get para obtener los libros en orden de fecha
    def get(self, request):
        books = Book.objects.filter(reserved=False, sold=False).order_by('-pubDate')

class CardView(viewsets.ModelViewSet):
    serializer_class = CardSerializer
    queryset = Card.objects.all()

class SaleView(viewsets.ModelViewSet):
    serializer_class = SaleSerializer
    queryset = Sale.objects.all()

class DevolutionView(viewsets.ModelViewSet):
    serializer_class = DevolutionSerializer
    queryset = Devolution.objects.all()

class ReservationView(viewsets.ModelViewSet):
    serializer_class = ReservationSerializer
    queryset = Reservation.objects.all()

class ChatView(viewsets.ModelViewSet):
    serializer_class = ChatSerializer
    queryset = Chat.objects.all()

class MessageView(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    queryset = Message.objects.all()

