from .serializers import BookSerializer, StoreSerializer
from .models import Book, Store
from rest_framework import viewsets

# Create your views here.
class BookView(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()

class StoreView(viewsets.ModelViewSet):
    serializer_class = StoreSerializer
    queryset = Store.objects.all()